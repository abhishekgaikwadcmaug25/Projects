package com.techshare.dto;

import com.techshare.entities.RequestStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentRequestResponseDTO {

    private Long requestId;
    private Long studentId;
    private String studentName;
    private String email;
    private com.techshare.entities.Gender gender;
    private String mobileNo;
    private String courseName;

    private Long instituteId;
    private Long courseId;

    private RequestStatus status;
}
