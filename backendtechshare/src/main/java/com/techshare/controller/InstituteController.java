package com.techshare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techshare.dto.InstituteRegisterRequest;
import com.techshare.dto.InstituteResponseDTO;
import com.techshare.service.InstituteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/institute")
@RequiredArgsConstructor
public class InstituteController {

    private final InstituteService instituteService;

    @PostMapping("/register")
    public ResponseEntity<?> registerInstitute(
            @Valid @RequestBody InstituteRegisterRequest request) {

        InstituteResponseDTO institute = instituteService.registerInstitute(request);
        return ResponseEntity.ok(institute);
    }

    @GetMapping("/current")
    public ResponseEntity<InstituteResponseDTO> getCurrentInstitute(java.security.Principal principal) {
        String email = principal.getName();
        return ResponseEntity.ok(instituteService.getInstituteByEmail(email));
    }

    @GetMapping("/students/course/{courseId}")
    public ResponseEntity<java.util.List<com.techshare.dto.StudentResponseDTO>> getStudentsByCourse(
            @PathVariable Long courseId,
            java.security.Principal principal) {

        Long instituteId = instituteService.getInstituteByEmail(principal.getName()).getId();
        return ResponseEntity.ok(instituteService.getStudentsByCourse(instituteId, courseId));
    }

    @GetMapping("/students/all")
    public ResponseEntity<java.util.List<com.techshare.dto.StudentResponseDTO>> getAllStudents(
            java.security.Principal principal) {

        Long instituteId = instituteService.getInstituteByEmail(principal.getName()).getId();
        return ResponseEntity.ok(instituteService.getAllStudents(instituteId));
    }
}
