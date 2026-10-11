package com.techshare.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.techshare.dto.AssignmentResponseDTO;
import com.techshare.dto.AssignmentUpdateDTO;

@Service
public interface AssignmentService {

	// Add Assignment
	AssignmentResponseDTO addAssignment(
			String title, String description, String dueDate, Integer totalMarks, Long instituteId, Long courseId,
			MultipartFile file) throws Exception;

	// List Of Assignment So That Student Can Access
	List<AssignmentResponseDTO> viewAssignmentsForStudent(Long instituteId, Long courseId);

	// Update Assignment
	AssignmentResponseDTO updateAssignment(Long assignmentId, AssignmentUpdateDTO dto, MultipartFile file)
			throws Exception;

	// Delete Assignment
	void deleteAssignment(Long assignmentId);

	// Assignment by course
	List<AssignmentResponseDTO> getAssignmentsByCourse(Long courseId);

	// Get All tehe Assignment
	List<AssignmentResponseDTO> getAllAssignments();

	// Download Assignment
	ResponseEntity<Resource> downloadAssignmentFile(Long assignmentId) throws Exception;

	// if student logged in then he can directly access the assignment
	List<AssignmentResponseDTO> getAssignmentsForLoggedStudent(String email);

	List<AssignmentResponseDTO> getAssignmentsByInstitute(Long instituteId);

}
