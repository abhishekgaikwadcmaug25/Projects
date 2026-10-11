package com.techshare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techshare.dto.CourseRequestDTO;
import com.techshare.dto.CourseResponseDTO;
import com.techshare.service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/institute/courses")
@RequiredArgsConstructor
public class InstituteCourseController {

    private final CourseService courseService;

    // Institute creates course
    @PostMapping("/create")
    public ResponseEntity<CourseResponseDTO> createCourse(
            @RequestBody CourseRequestDTO dto) {

        return ResponseEntity.ok(courseService.createCourse(dto));
    }

    // Institute gets all its courses
    @GetMapping("/institute/{instituteId}")
    public ResponseEntity<List<CourseResponseDTO>> getCoursesByInstitute(
            @PathVariable Long instituteId) {

        return ResponseEntity.ok(courseService.getCoursesByInstitute(instituteId));
    }
}
