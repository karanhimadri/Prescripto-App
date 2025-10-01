package com.example.prescripto.models.patient;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Patient {
    @Id
    private String email;

    private String password;
    private String role;

    public Patient() {};

    public Patient(String email, String name, String password) {
        this.email = email;
        this.password = password;
    }
}
