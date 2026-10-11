package com.techshare.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseResponseDTO {
	private Long id;
    private String courseName;
    private String description;

    private Long instituteId;
}
