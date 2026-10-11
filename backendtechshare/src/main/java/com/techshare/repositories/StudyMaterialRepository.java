package com.techshare.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techshare.entities.Institute;
import com.techshare.entities.MaterialType;
import com.techshare.entities.StudyMaterial;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {

	// get all the study material by course id
	List<StudyMaterial> findByCourseId(Long courseId);

	List<StudyMaterial> findByCourseIdAndType(Long courseId, MaterialType type);

	List<StudyMaterial> findByInstituteIdAndCourseId(Long instituteId, Long courseId);

	List<StudyMaterial> findByInstituteIdAndCourseIdAndType(Long instituteId, Long courseId, MaterialType type);

	// Download the study Materials
	Optional<StudyMaterial> findByIdAndType(Long id, MaterialType type);

	List<StudyMaterial> findByInstituteId(Long instituteId);
}
