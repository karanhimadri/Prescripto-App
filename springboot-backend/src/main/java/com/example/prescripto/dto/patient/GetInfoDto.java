package com.example.prescripto.dto.patient;

import com.example.prescripto.dto.BaseResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class GetInfoDto implements BaseResponseDto {

    private String name;
    private String email;
    private String phone;
    private String addLine1;
    private String addLine2;
    private String gender;
    private LocalDate dob;
    private String profileImage;

    public GetInfoDto() {};
    public GetInfoDto(String name, String phone, String addLine1, String addLine2, String gender, LocalDate dob) {
        this.name = name;
        this.phone = phone;
        this.addLine1 = addLine1;
        this.addLine2 = addLine2;
        this.gender = gender;
        this.dob = dob;
    }

    public GetInfoDto(String name, String email, String phone, String addLine1, String addLine2, String gender, LocalDate dob, String profileImage) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.addLine1 = addLine1;
        this.addLine2 = addLine2;
        this.gender = gender;
        this.dob = dob;
        this.profileImage = profileImage;
    }
}
