package com.techshare.dto;

import lombok.*;

@Getter
@Setter
public class InstituteResponseDTO {

    private Long id;
    private String instituteName;
    private String instituteType;
    private String phoneNo;
    private String address;

    private String email; // from User
    private long studentCount; // count of students
}
