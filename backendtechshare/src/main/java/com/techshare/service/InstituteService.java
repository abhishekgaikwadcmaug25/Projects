package com.techshare.service;

import java.util.List;

import com.techshare.dto.InstituteRegisterRequest;
import com.techshare.dto.InstituteResponseDTO;
import com.techshare.dto.InstituteUpdateRequestDTO;
import com.techshare.entities.ApiResponse;
import com.techshare.entities.Role;

import jakarta.validation.Valid;

public interface InstituteService {

	InstituteResponseDTO registerInstitute(InstituteRegisterRequest request);

	List<InstituteResponseDTO> getAllInstitutes();

	InstituteResponseDTO getInstituteById(Long id);

	// InstituteResponseDTO updateInstitute(Long id, InstituteUpdateRequestDTO dto);

	ApiResponse deleteInstitute(Long instituteId);

	InstituteResponseDTO updateInstitute(Long id, @Valid InstituteUpdateRequestDTO dto);

	long countUsersByRole(Role role);

	InstituteResponseDTO getInstituteByEmail(String email);

	java.util.List<com.techshare.dto.StudentResponseDTO> getStudentsByCourse(Long instituteId, Long courseId);

	java.util.List<com.techshare.dto.StudentResponseDTO> getAllStudents(Long instituteId);
}
