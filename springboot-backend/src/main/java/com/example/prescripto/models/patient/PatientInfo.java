package com.example.prescripto.models.patient;

import com.example.prescripto.models.junctionModel.Appointment;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
public class PatientInfo {
    @Id
    private String email;

    private String fullName;
    private String phone;
    private String addLine1;
    private String addLine2;
    private String gender;
    private LocalDate dob;
    private String profileImage;

    @OneToMany(mappedBy = "patientInfo")
    private List<Appointment> appointments;

    public PatientInfo() {};
    public PatientInfo(String email, String fullName, String phone, String addLine1, String addLine2, String gender, LocalDate dob, String profileImage) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.addLine1 = addLine1;
        this.addLine2 = addLine2;
        this.gender = gender;
        this.dob = dob;
        this.profileImage = profileImage;
    }

}
