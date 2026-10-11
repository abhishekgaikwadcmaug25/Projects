package com.techshare.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techshare.entities.Student;
import com.techshare.entities.User;

public interface StudentRepository extends JpaRepository<Student, Long> {

	Optional<Student> findByUserEmail(String email);

	Optional<Student> findByUser(User user);

	long countByInstituteId(Long instituteId);

	java.util.List<Student> findByInstituteId(Long instituteId);

	java.util.List<Student> findByInstituteIdAndCourseId(Long instituteId, Long courseId);
}
