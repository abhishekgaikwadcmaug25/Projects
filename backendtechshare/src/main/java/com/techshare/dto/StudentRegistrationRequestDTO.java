package com.techshare.dto;

import com.techshare.entities.Gender;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class StudentRegistrationRequestDTO {

    private String studentName;
    private String email;
    private String password;
    private Gender gender;
    private LocalDate dob;
    private String mobileNo;

    private Long instituteId;
    private Long courseId;
}
