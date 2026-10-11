package com.techshare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techshare.dto.CourseResponseDTO;
import com.techshare.service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student/courses")
@RequiredArgsConstructor
public class StudentCourseController {

    private final CourseService courseService;

    //Student sees courses of institute
    @GetMapping("/institute/{instituteId}")
    public ResponseEntity<List<CourseResponseDTO>> getCourses(
            @PathVariable Long instituteId) {

        return ResponseEntity.ok(courseService.getCoursesByInstitute(instituteId));
    }

    // ✅ Student sees course detail
    @GetMapping("/{courseId}")
    public ResponseEntity<CourseResponseDTO> getCourseDetail(
            @PathVariable Long courseId) {

        return ResponseEntity.ok(courseService.getCourseById(courseId));
    }
}
