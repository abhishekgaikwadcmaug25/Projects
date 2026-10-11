package com.techshare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.techshare.dto.AssignmentRequestDTO;
import com.techshare.dto.AssignmentResponseDTO;
import com.techshare.dto.AssignmentUpdateDTO;
import com.techshare.entities.Assignment;
import com.techshare.service.AssignmentService;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/institute/assignments")
@RequiredArgsConstructor
public class AssignmentController {
	@Autowired
	private AssignmentService assignmentService;

	// ADD ASSIGNMENT
	@PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<AssignmentResponseDTO> addAssignmentWithFile(@RequestParam("title") String title,
			@RequestParam("description") String description, @RequestParam("dueDate") String dueDate,
			@RequestParam("totalMarks") Integer totalMarks, @RequestParam("instituteId") Long instituteId,
			@RequestParam("courseId") Long courseId,
			@RequestPart("file") @Schema(type = "string", format = "binary") MultipartFile file) throws Exception {
		return ResponseEntity.ok(
				assignmentService.addAssignment(title, description, dueDate, totalMarks, instituteId, courseId, file));
	}

	// UPDATE ASSIGNMENT
	@PutMapping(value = "/update/{assignmentId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<AssignmentResponseDTO> updateAssignment(

			@PathVariable Long assignmentId,

			// DTO fields optional
			@ModelAttribute AssignmentUpdateDTO dto,

			// File optional
			@RequestPart(value = "file", required = false) MultipartFile file

	) throws Exception {

		return ResponseEntity.ok(assignmentService.updateAssignment(assignmentId, dto, file));
	}

	// Delete Assignment
	@DeleteMapping("/delete/{assignmentId}")
	public ResponseEntity<String> deleteAssignment(@PathVariable Long assignmentId) {
		assignmentService.deleteAssignment(assignmentId);

		return ResponseEntity.ok("Assignment Deleted Successfully !");
	}

	// All the Assignments
	@GetMapping("/all")
	public ResponseEntity<List<AssignmentResponseDTO>> getAllAssignments() {

		return ResponseEntity.ok(
				assignmentService.getAllAssignments());
	}

	// View Assignment By course
	@GetMapping("/course/{courseId}")
	public ResponseEntity<List<AssignmentResponseDTO>> getAssignmentsByCourse(
			@PathVariable Long courseId) {
		return ResponseEntity.ok(
				assignmentService.getAssignmentsByCourse(courseId));
	}

	// All Assignments by Institute
	@GetMapping("/institute/{instituteId}")
	public ResponseEntity<List<AssignmentResponseDTO>> getAssignmentsByInstitute(
			@PathVariable Long instituteId) {
		return ResponseEntity.ok(
				assignmentService.getAssignmentsByInstitute(instituteId));
	}

	// Download the Assignment
	// Download the notes
	@GetMapping("/download/{assignmentId}")
	public ResponseEntity<Resource> downloadAssignment(@PathVariable Long assignmentId) throws Exception {

		return assignmentService.downloadAssignmentFile(assignmentId);
	}
}
