package com.techshare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.techshare.dto.CourseRequestDTO;
import com.techshare.dto.CourseResponseDTO;
import com.techshare.entities.Course;
import com.techshare.entities.Institute;
import com.techshare.repositories.CourseRepository;
import com.techshare.repositories.InstituteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepo;
    private final InstituteRepository instituteRepo;

    @Override
    public CourseResponseDTO createCourse(CourseRequestDTO dto) {

        Institute institute = instituteRepo.findById(dto.getInstituteId())
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        Course course = new Course();
        course.setCourseName(dto.getCourseName());
        course.setDescription(dto.getDescription());
        course.setInstitute(institute);

        return mapToDTO(courseRepo.save(course));
    }

    @Override
    public List<CourseResponseDTO> getCoursesByInstitute(Long instituteId) {

        return courseRepo.findByInstituteId(instituteId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public CourseResponseDTO getCourseById(Long courseId) {

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return mapToDTO(course);
    }

    private CourseResponseDTO mapToDTO(Course course) {

        CourseResponseDTO dto = new CourseResponseDTO();
        dto.setId(course.getId());
        dto.setCourseName(course.getCourseName());
        dto.setDescription(course.getDescription());
        dto.setInstituteId(course.getInstitute().getId());

        return dto;
    }
}
