package com.techshare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.techshare.dto.MaterialResponseDTO;
import com.techshare.entities.MaterialType;
import com.techshare.service.StudyMaterialService;
import org.springframework.core.io.Resource;

@RestController
@RequestMapping("/api/institute/materials")

public class StudyMaterialController {

	@Autowired
	private StudyMaterialService materialService;

	// Upload Notes / Question Bank
	@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<MaterialResponseDTO> uploadMaterial(@RequestParam String title,
			@RequestParam Long instituteId, @RequestParam Long courseId, @RequestParam MaterialType type,
			@RequestParam MultipartFile file) {
		return ResponseEntity.ok(materialService.uploadMaterial(title, instituteId, courseId, type, file));
	}

	// get all the study materials
	@GetMapping("/all")
	public ResponseEntity<List<MaterialResponseDTO>> getAllMaterials(@RequestParam Long instituteId) {
		return ResponseEntity.ok(materialService.getAllMaterials(instituteId));
	}

	// Update the Study MAterial
	@PutMapping(value = "/update/{materialId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<MaterialResponseDTO> updateMaterial(
			@PathVariable Long materialId,

			@RequestParam(required = false) String title,
			@RequestParam(required = false) MaterialType type,
			@RequestParam(required = false) Long courseId,
			@RequestParam(required = false) MultipartFile file) throws Exception {

		return ResponseEntity.ok(
				materialService.updateMaterial(materialId, title, type, courseId, file));
	}

	// get study materials by Course
	@GetMapping("/course/{courseId}")
	public ResponseEntity<List<MaterialResponseDTO>> getMaterialsByCourse(
			@PathVariable Long courseId) {

		return ResponseEntity.ok(materialService.getMaterialsByCourse(courseId));
	}

	// View Notes
	@GetMapping("/course/{courseId}/notes")
	public ResponseEntity<List<MaterialResponseDTO>> viewNotes(@PathVariable Long courseId) {
		return ResponseEntity.ok(materialService.getMaterialsByCourseAndType(courseId, MaterialType.NOTES));
	}

	// View Question Bank
	@GetMapping("/course/{courseId}/question-bank")
	public ResponseEntity<List<MaterialResponseDTO>> viewQuestionBank(@PathVariable Long courseId) {
		return ResponseEntity.ok(materialService.getMaterialsByCourseAndType(courseId, MaterialType.QUESTION_BANK));
	}

	@DeleteMapping("/delete/{materialId}")
	public ResponseEntity<String> deleteMaterial(@PathVariable Long materialId) {

		materialService.deleteMaterial(materialId);

		return ResponseEntity.ok("Study Material Deleted Successfully!");
	}

	// Download Material
	@GetMapping("/download/{materialId}")
	public ResponseEntity<Resource> downloadMaterial(@PathVariable Long materialId) {
		return materialService.downloadMaterial(materialId);
	}

}
