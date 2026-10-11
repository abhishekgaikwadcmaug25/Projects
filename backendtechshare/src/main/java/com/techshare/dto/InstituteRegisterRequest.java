package com.techshare.dto;

import com.techshare.entities.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class InstituteRegisterRequest {

    // User fields
    @NotBlank(message = "Username required")
    private String email;

    @NotBlank(message = "Password required")
    @Size(min = 6)
    private String password;

    // Institute fields
    @NotBlank(message = "Institute name required")
    private String instituteName;

    @NotNull(message = "Institute type required")
    private InstituteType instituteType;

    @NotBlank(message = "Phone number required")
    private String phoneNo;

    @NotBlank(message = "Address required")
    private String address;

    private boolean verified;

}
