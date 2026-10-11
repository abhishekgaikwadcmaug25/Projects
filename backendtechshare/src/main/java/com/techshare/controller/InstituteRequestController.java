package com.techshare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.techshare.dto.StudentRequestResponseDTO;
import com.techshare.service.StudentRegistrationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/institute/requests")
@RequiredArgsConstructor
public class InstituteRequestController {

    private final StudentRegistrationService registrationService;

    //Institute View All Pending Requests
    @GetMapping("/pending/{instituteId}")
    public ResponseEntity<List<StudentRequestResponseDTO>> getPendingRequests(
            @PathVariable Long instituteId) {

        return ResponseEntity.ok(
                registrationService.getPendingRequests(instituteId)
        );
    }

    //Approve Student Request
    @PutMapping("/approve/{requestId}")
    public ResponseEntity<String> approveRequest(
            @PathVariable Long requestId) {

        return ResponseEntity.ok(
                registrationService.approveRequest(requestId)
        );
    }

    //Reject Student Request
    @PutMapping("/reject/{requestId}")
    public ResponseEntity<String> rejectRequest(
            @PathVariable Long requestId) {

        return ResponseEntity.ok(
                registrationService.rejectRequest(requestId)
        );
    }

    //View All Requests (Optional)
    @GetMapping("/all/{instituteId}")
    public ResponseEntity<List<StudentRequestResponseDTO>> getAllRequests(
            @PathVariable Long instituteId) {

        return ResponseEntity.ok(
                registrationService.getAllRequests(instituteId)
        );
    }
}
