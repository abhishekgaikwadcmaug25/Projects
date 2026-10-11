package com.techshare.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentUpdateDTO {

	private String title;
	private String description;
	private String dueDate;
	private Integer totalMarks;
	private Long courseId;
}
