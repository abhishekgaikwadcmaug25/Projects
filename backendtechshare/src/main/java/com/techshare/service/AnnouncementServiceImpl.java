package com.techshare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.techshare.dto.AnnouncementRequestDTO;
import com.techshare.dto.AnnouncementResponseDTO;
import com.techshare.entities.Announcement;
import com.techshare.entities.AnnouncementStatus;
import com.techshare.entities.Course;
import com.techshare.entities.Institute;
import com.techshare.repositories.AnnouncementRepository;
import com.techshare.repositories.CourseRepository;
import com.techshare.repositories.InstituteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

	private final AnnouncementRepository announcementRepository;
	private final InstituteRepository instituteRepository;
	private final CourseRepository courseRepository;

	// Create Announcement
	@Override
	public AnnouncementResponseDTO createAnnouncement(AnnouncementRequestDTO dto) {
		Institute institute = instituteRepository.findById(dto.getInstituteId())
				.orElseThrow(() -> new RuntimeException("Institute not found"));

		Course course = courseRepository.findById(dto.getCourseId())
				.orElseThrow(() -> new RuntimeException("Course not found"));

		Announcement announcement = new Announcement();
		announcement.setTitle(dto.getTitle());
		announcement.setMessage(dto.getMessage());
		announcement.setInstitute(institute);
		announcement.setCourse(course);

		return mapToDTO(announcementRepository.save(announcement));
	}

	// Update Announcement
	@Override
	public AnnouncementResponseDTO updateAnnouncement(Long announcementId, AnnouncementRequestDTO dto) {
		Announcement announcement = announcementRepository.findById(announcementId)
				.orElseThrow(() -> new RuntimeException("Announcement not found"));

		if (dto.getTitle() != null)
			announcement.setTitle(dto.getTitle());

		if (dto.getMessage() != null)
			announcement.setMessage(dto.getMessage());

		if (dto.getCourseId() != null) {
			Course course = courseRepository.findById(dto.getCourseId())
					.orElseThrow(() -> new RuntimeException("Course not found"));
			announcement.setCourse(course);
		}

		return mapToDTO(announcementRepository.save(announcement));
	}

	// Delete Announcement
	@Override
	public void deleteAnnouncement(Long announcementId) {
		announcementRepository.deleteById(announcementId);
	}

	// Announcement for Student
	@Override
	public List<AnnouncementResponseDTO> getAnnouncementsByCourse(Long courseId) {
		return announcementRepository
				.findByCourseIdAndStatus(courseId, AnnouncementStatus.ACTIVE)
				.stream()
				.map(this::mapToDTO)
				.toList();
	}

	// Announcement for institute
	@Override
	public List<AnnouncementResponseDTO> getAnnouncementsByInstitute(Long instituteId) {
		return announcementRepository.findByInstituteId(instituteId)
				.stream()
				.map(this::mapToDTO)
				.toList();
	}

	// Mapper
	private AnnouncementResponseDTO mapToDTO(Announcement announcement) {

		AnnouncementResponseDTO dto = new AnnouncementResponseDTO();
		dto.setId(announcement.getId());
		dto.setTitle(announcement.getTitle());
		dto.setMessage(announcement.getMessage());
		dto.setStatus(announcement.getStatus());
		dto.setPublishedAt(announcement.getPublishedAt());
		dto.setInstituteId(announcement.getInstitute().getId());
		dto.setCourseId(announcement.getCourse().getId());

		return dto;
	}

}
