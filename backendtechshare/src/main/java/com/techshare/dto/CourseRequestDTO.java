package com.techshare.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseRequestDTO {

    private String courseName;
    private String description;

    private Long instituteId;
}
