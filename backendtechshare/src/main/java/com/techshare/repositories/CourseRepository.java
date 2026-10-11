package com.techshare.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techshare.entities.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
	List<Course> findByInstituteId(Long instituteId);
}
