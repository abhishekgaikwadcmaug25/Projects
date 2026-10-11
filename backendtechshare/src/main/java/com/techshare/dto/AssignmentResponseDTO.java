package com.techshare.dto;

import java.time.LocalDate;

import com.techshare.entities.AssignmentStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentResponseDTO {

    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private Integer totalMarks;
    private AssignmentStatus status;

    private Long instituteId;
    private Long courseId;

    private String fileUrl;
    private String fileName;
}
