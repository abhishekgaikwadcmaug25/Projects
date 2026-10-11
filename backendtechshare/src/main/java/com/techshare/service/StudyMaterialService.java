package com.techshare.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.techshare.dto.MaterialResponseDTO;
import com.techshare.entities.MaterialType;

public interface StudyMaterialService {

	// Add the material
	MaterialResponseDTO uploadMaterial(String title, Long instituteId, Long courseId, MaterialType type,
			MultipartFile file);

	// Update Study Material
	MaterialResponseDTO updateMaterial(Long materialId, String title, MaterialType type, Long courseId,
			MultipartFile file);

	// retrive all the study materials
	List<MaterialResponseDTO> getAllMaterials(Long instituteId);

	// retrive all the study material by course
	List<MaterialResponseDTO> getMaterialsByCourse(Long courseId);

	// Get Study Material by course and type
	List<MaterialResponseDTO> getMaterialsByCourseAndType(Long courseId, MaterialType type);

	// delete study material
	void deleteMaterial(Long materialId);

	// downalod the material
	ResponseEntity<Resource> downloadMaterial(Long materialId);

	// Context-aware retrieval for students
	List<MaterialResponseDTO> getMaterialsForLoggedStudent(String email);

	List<MaterialResponseDTO> getMaterialsByTypeForLoggedStudent(String email, MaterialType type);
}
