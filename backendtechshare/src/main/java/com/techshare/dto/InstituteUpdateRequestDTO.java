package com.techshare.dto;

import lombok.*;

@Getter
@Setter
public class InstituteUpdateRequestDTO {

    private String instituteName;

    private String phoneNo;

    private String address;

    private String email;

    private String instituteType;
}
