package com.techshare.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techshare.dto.InstituteRegisterRequest;
import com.techshare.dto.InstituteResponseDTO;
import com.techshare.dto.InstituteUpdateRequestDTO;
import com.techshare.entities.ApiResponse;
import com.techshare.entities.Institute;
import com.techshare.service.InstituteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final InstituteService instituteService;

    @GetMapping("/dashboard")
    public String adminApi() {
        return "Admin Access Granted";
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalAdmins", instituteService.countUsersByRole(com.techshare.entities.Role.ADMIN));
        stats.put("totalInstitutes", instituteService.countUsersByRole(com.techshare.entities.Role.INSTITUTE));
        stats.put("totalStudents", instituteService.countUsersByRole(com.techshare.entities.Role.STUDENT));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/institutes")
    public ResponseEntity<List<InstituteResponseDTO>> getAll() {
        return ResponseEntity.ok(instituteService.getAllInstitutes());
    }

    @GetMapping("/institutes/{id}")
    public ResponseEntity<InstituteResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(instituteService.getInstituteById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteInstitute(@PathVariable Long id) {
        ApiResponse response = instituteService.deleteInstitute(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstituteResponseDTO> updateInstitute(
            @PathVariable Long id,
            @Valid @RequestBody InstituteUpdateRequestDTO dto) {

        InstituteResponseDTO updated = instituteService.updateInstitute(id, dto);
        return ResponseEntity.ok(updated);
    }

}
