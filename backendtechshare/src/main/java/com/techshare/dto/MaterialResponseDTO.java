package com.techshare.dto;

import com.techshare.entities.MaterialType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialResponseDTO {

	private Long id;
	private String title;
	private String fileUrl;
	private MaterialType type;

	private Long instituteId;
	private Long courseId;
	private String fileName;
}
