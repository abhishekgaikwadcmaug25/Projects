package com.techshare.service;

import java.util.List;

import com.techshare.dto.CourseRequestDTO;
import com.techshare.dto.CourseResponseDTO;

public interface CourseService {
	CourseResponseDTO createCourse(CourseRequestDTO dto);

    List<CourseResponseDTO> getCoursesByInstitute(Long instituteId);

    CourseResponseDTO getCourseById(Long courseId);
}
