package com.example.prescripto.controller;

import com.example.prescripto.dto.ApiResponse;
import com.example.prescripto.dto.AuthResponseDto;
import com.example.prescripto.dto.BaseResponseDto;
import com.example.prescripto.dto.SuccessAndErrorResDto;
import com.example.prescripto.dto.appointment.AppointmentBookingRequestDto;
import com.example.prescripto.dto.patient.AppointmentDto;
import com.example.prescripto.dto.patient.GetInfoDto;
import com.example.prescripto.dto.patient.LoginRequestDto;
import com.example.prescripto.dto.patient.LoginResponseDto;
import com.example.prescripto.models.patient.Patient;
import com.example.prescripto.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired PatientService patientService;

    @PostMapping("/create-account")
    public AuthResponseDto createAccount(@RequestBody Patient patient) {
        return patientService.createAccount(patient);
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto loginRequestDto) {
        return patientService.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());
    }

    @GetMapping("/me")
    public BaseResponseDto getPatientProfile(Authentication authentication) {
        return patientService.getPatientProfile(authentication.getName());
    }

    @PostMapping("/update-profile")
    public SuccessAndErrorResDto addOrUpdatePatientInfo(
            @RequestParam("image") MultipartFile image,
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam("addLine1") String line1,
            @RequestParam("addLine2") String line2,
            @RequestParam(value = "gender", required = false) String gender,
            @RequestParam(value = "dob", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dob,
            Authentication authentication) {

        String normalizedGender = (gender != null && !gender.trim().isEmpty()) ? gender : null;
        GetInfoDto newPatientInfo = new GetInfoDto(name, phone, line1, line2, normalizedGender, dob);

        return patientService.updatePatientProfile(image, newPatientInfo, authentication.getName());
    }

    @PostMapping("/book-appointment")
    public SuccessAndErrorResDto appointmentBook(@RequestBody AppointmentBookingRequestDto abrDto) {
        return patientService.bookAppointment(abrDto);
    }

    @GetMapping("/all-appointments")
    public ApiResponse<List<AppointmentDto>> getAllAppointments(Authentication auth) {
        return patientService.getAllAppointments(auth.getName());
    }

    @PatchMapping("/cancel-appointment/{id}")
    public SuccessAndErrorResDto cancelAppointment(@PathVariable Long id) {
        return patientService.cancelAppointment(id);
    }

}




