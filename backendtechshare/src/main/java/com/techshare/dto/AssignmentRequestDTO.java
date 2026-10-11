package com.techshare.dto;

import lombok.Setter;
import lombok.Getter;
import java.time.LocalDate;
import com.techshare.entities.AssignmentStatus;

@Getter
@Setter

public class AssignmentRequestDTO {

	private String title;
	private String description;
	private LocalDate dueDate;
	private Integer totalMarks;
	private AssignmentStatus status;

	private Long instituteId;
	private Long courseId;
}
