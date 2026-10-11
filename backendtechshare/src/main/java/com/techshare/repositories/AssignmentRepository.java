package com.techshare.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.techshare.entities.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

	List<Assignment> findByInstituteIdAndCourseId(Long instituteId, Long courseId);

	List<Assignment> findByCourseId(Long courseId);

	List<Assignment> findByInstituteId(Long instituteId);

}
