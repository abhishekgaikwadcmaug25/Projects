package com.techshare.service;

import java.util.List;

import com.techshare.dto.StudentRegistrationRequestDTO;
import com.techshare.dto.StudentRequestResponseDTO;

public interface StudentRegistrationService {

    String sendRequest(StudentRegistrationRequestDTO dto);

    String approveRequest(Long requestId);

    String rejectRequest(Long requestId);

    List<StudentRequestResponseDTO> getPendingRequests(Long instituteId);

    StudentRequestResponseDTO getStudentRequestStatus(String email);

    boolean canAccessInstitute(String email);

    List<StudentRequestResponseDTO> getAllRequests(Long instituteId);
}
