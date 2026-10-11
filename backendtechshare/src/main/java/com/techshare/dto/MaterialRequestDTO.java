package com.techshare.dto;

import com.techshare.entities.MaterialType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialRequestDTO {

	private String title;
	private Long instituteId;
	private Long courseId;
	private MaterialType type;
}
