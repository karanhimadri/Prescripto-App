package com.example.prescripto.services;

import com.example.prescripto.dto.ApiResponse;
import com.example.prescripto.dto.AuthResponseDto;
import com.example.prescripto.dto.BaseResponseDto;
import com.example.prescripto.dto.SuccessAndErrorResDto;
import com.example.prescripto.dto.appointment.AppointmentBookingRequestDto;
import com.example.prescripto.dto.patient.AppointmentDto;
import com.example.prescripto.dto.patient.GetInfoDto;
import com.example.prescripto.dto.patient.LoginResponseDto;
import com.example.prescripto.models.doctor.Doctor;
import com.example.prescripto.models.junctionModel.Appointment;
import com.example.prescripto.models.patient.Patient;
import com.example.prescripto.models.patient.PatientInfo;
import com.example.prescripto.models.payment.PaymentInfo;
import com.example.prescripto.repository.doctor.DoctorRepository;
import com.example.prescripto.repository.junctionRepository.AppointmentRepository;
import com.example.prescripto.repository.patient.PatientInfoRepository;
import com.example.prescripto.repository.patient.PatientRepository;
import com.example.prescripto.utils.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.*;

@Service
public class PatientService {

    private static final Logger logger = LoggerFactory.getLogger(PatientService.class);

    private final PatientRepository patientRepository;
    private final PatientInfoRepository patientInfoRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public PatientService(PatientRepository patientRepository, PatientInfoRepository patientInfoRepository, DoctorRepository doctorRepository, AppointmentRepository appointmentRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.patientRepository = patientRepository;
        this.patientInfoRepository = patientInfoRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponseDto createAccount(Patient patient) {
        if(patientRepository.existsById(patient.getEmail())) {
            return new AuthResponseDto(false, "Email Id already exists.");
        }

        String hashPass = passwordEncoder.encode(patient.getPassword());
        patient.setPassword(hashPass);
        patient.setRole("PATIENT");
        patientRepository.save(patient);
        String token = jwtUtil.generateToken(patient.getEmail(), "PATIENT");

        return new AuthResponseDto(true,"Account created successfully.", patient.getEmail(),"PATIENT",token);
    }

    public LoginResponseDto login(String email, String password) {
        Optional<Patient> optionalPatient = patientRepository.findById(email);
        if(optionalPatient.isEmpty()) {
            return new LoginResponseDto(false, "Invalid email or password.");
        }

        Patient patient = optionalPatient.get();
        if(!passwordEncoder.matches(password, patient.getPassword())) {
            return new LoginResponseDto(false, "Invalid email or password.");
        }
        String token = jwtUtil.generateToken(email, "PATIENT");

        return new LoginResponseDto(true,"User logged in successfully.", email, "", token);
    }

    public SuccessAndErrorResDto updatePatientProfile(MultipartFile image, GetInfoDto getInfoDto, String email) {
        Optional<PatientInfo> optionalPatientInfo = patientInfoRepository.findById(email);

        // CASE 1: Patient not found -> create new record
        if (optionalPatientInfo.isEmpty()) {
            String imageURL = "";
            try {
                if (image != null && !image.isEmpty()) {
                    imageURL = uploadPatientImage(image);
                }
            } catch (IOException e) {
                return new SuccessAndErrorResDto(false, "Image upload error.");
            }

            PatientInfo newInfo = new PatientInfo( email, getInfoDto.getName(), getInfoDto.getPhone(), getInfoDto.getAddLine1(),
                    getInfoDto.getAddLine2(),
                    getInfoDto.getGender(),
                    getInfoDto.getDob(),
                    imageURL
            );

            patientInfoRepository.save(newInfo);
            return new SuccessAndErrorResDto(true, "Patient information successfully added.");
        }

        // CASE 2: Patient exists -> update selectively
        PatientInfo existingPatientInfo = updateNonNullFields(getInfoDto, optionalPatientInfo.get());

        // Handle image update if provided
        if (image != null && !image.isEmpty()) {
            try {
                String imageURL = uploadPatientImage(image);
                existingPatientInfo.setProfileImage(imageURL);
            } catch (IOException e) {
                return new SuccessAndErrorResDto(false, "Image upload error.");
            }
        }

        patientInfoRepository.save(existingPatientInfo);
        return new SuccessAndErrorResDto(true, "Patient information successfully updated.");
    }

    private PatientInfo updateNonNullFields(GetInfoDto getInfoDto, PatientInfo existingPatientInfo) {
        if (getInfoDto.getName() != null) {
            existingPatientInfo.setFullName(getInfoDto.getName());
        }
        if (getInfoDto.getPhone() != null) {
            existingPatientInfo.setPhone(getInfoDto.getPhone());
        }
        if (getInfoDto.getAddLine1() != null) {
            existingPatientInfo.setAddLine1(getInfoDto.getAddLine1());
        }
        if (getInfoDto.getAddLine2() != null) {
            existingPatientInfo.setAddLine2(getInfoDto.getAddLine2());
        }
        if (getInfoDto.getGender() != null) {
            existingPatientInfo.setGender(getInfoDto.getGender());
        }
        if (getInfoDto.getDob() != null) {
            existingPatientInfo.setDob(getInfoDto.getDob());
        }
        return existingPatientInfo;
    }

    public BaseResponseDto getPatientProfile(String email) {
        Optional<Patient> optPatient = patientRepository.findById(email);
        Optional<PatientInfo> optPatientInfo = patientInfoRepository.findById(email);

        if(optPatient.isEmpty()) {
            return new SuccessAndErrorResDto(false,"User not found.");
        }

        Patient patient = optPatient.get();

        if(optPatientInfo.isEmpty()) {
            return null;
        }

        PatientInfo patientInfo = optPatientInfo.get();

        return new GetInfoDto(patientInfo.getFullName(), patient.getEmail(), patientInfo.getPhone(), patientInfo.getAddLine1(), patientInfo.getAddLine2(), patientInfo.getGender(), patientInfo.getDob(), patientInfo.getProfileImage());
    }

    private String uploadPatientImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // 5MB limit
        long maxSizeInBytes = 5 * 1024 * 1024;
        if (file.getSize() > maxSizeInBytes) {
            throw new IllegalArgumentException("File exceeds 2MB limit");
        }

        // Validate content type
        String contentType = file.getContentType();
        if (contentType == null ||
                (!contentType.equals("image/jpeg") &&
                        !contentType.equals("image/png") &&
                        !contentType.equals("image/jpg"))) {
            throw new IllegalArgumentException("Only JPG and PNG images are allowed");
        }

        // Upload directory (make configurable ideally)
        String uploadDir = "uploads/";
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Clean filename
        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        if(originalFileName.contains("..")) {
            throw new IllegalArgumentException("Invalid file path");
        }

        // Unique file name
        String fileName = System.currentTimeMillis() + "_" + originalFileName;
        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return public URL (must configure static resource handler)
        return "http://localhost:8080/uploads/" + fileName;
    }

    public SuccessAndErrorResDto bookAppointment(AppointmentBookingRequestDto abrDto) {

        Optional<PatientInfo> optPatient = patientInfoRepository.findById(abrDto.getPatientId());
        Optional<Doctor> optDoctor = doctorRepository.findById(abrDto.getDoctorId());

        if(optPatient.isEmpty()) {
            return new SuccessAndErrorResDto(false, "No patient found");
        }
        if(optDoctor.isEmpty()) {
            return new SuccessAndErrorResDto(false, "No doctor found");
        }

        Appointment appointment = new Appointment();

        LocalDate appointmentDate = LocalDate.parse(abrDto.getAppointmentDate());
        appointment.setAppointmentDate(appointmentDate);

        appointment.setAppointmentTime(abrDto.getAppointmentTime());
        appointment.setPatientInfo(optPatient.get());
        appointment.setDoctor(optDoctor.get());
        appointment.setStatus("SCHEDULED");

        appointmentRepository.save(appointment);

        return new SuccessAndErrorResDto(true, "Appointment booked successfully!");
    }

    public ApiResponse<List<AppointmentDto>> getAllAppointments(String patientId) {
        Optional<PatientInfo> optPatient = patientInfoRepository.findById(patientId);

        if (optPatient.isEmpty()) {
            return new ApiResponse<>(false, "No Patient found", Collections.emptyList());
        }

        List<AppointmentDto> appointmentDtos = optPatient.get().getAppointments().stream()
                .map(appointment -> {
                    Doctor doc = appointment.getDoctor();
                    PaymentInfo pay = appointment.getPaymentInfo();
                    return new AppointmentDto(
                            appointment.getId(),
                            doc != null ? doc.getProfileImage() : null,
                            doc != null ? doc.getName() : null,
                            doc != null ? doc.getSpeciality() : null,
                            doc != null ? doc.getFees() : null,
                            doc != null ? doc.getAddLine1() : null,
                            doc != null ? doc.getAddLine2() : null,
                            appointment.getAppointmentDate(),
                            appointment.getAppointmentTime(),
                            pay != null ? pay.getStatus() : null,
                            appointment.getStatus()
                    );
                }).toList();

        return new ApiResponse<>(true, "Appointment Details fetched.", appointmentDtos);
    }

    public SuccessAndErrorResDto cancelAppointment(Long appointmentId) {
        Optional<Appointment> optAppointment = appointmentRepository.findById(appointmentId);

        if(optAppointment.isEmpty()) {
            return new SuccessAndErrorResDto(false, "Appointment not found");
        }

        Appointment appointment = optAppointment.get();

        if ("CANCELED".equalsIgnoreCase(appointment.getStatus())) {
            return new SuccessAndErrorResDto(false, "Appointment is already canceled.");
        }

        appointment.setStatus("CANCELED");
        appointmentRepository.save(appointment);

        return new SuccessAndErrorResDto(true, "Appointment canceled successfully");
    }

}
