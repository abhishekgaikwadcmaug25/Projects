package com.techshare.service;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.techshare.dto.MaterialResponseDTO;
import com.techshare.entities.*;
import com.techshare.repositories.CourseRepository;
import com.techshare.repositories.InstituteRepository;
import com.techshare.repositories.StudyMaterialRepository;

@Service
public class StudyMaterialServiceImpl implements StudyMaterialService {

	@Autowired
	private StudyMaterialRepository materialRepository;

	@Autowired
	private InstituteRepository instituteRepository;

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private com.techshare.repositories.StudentRepository studentRepository;

	@Autowired
	private FileStorageService fileStorageService;

	@Value("${file.upload-dir}")
	private String uploadDir;

	// Upload Notes / Question Bank
	@Override
	public MaterialResponseDTO uploadMaterial(String title, Long instituteId, Long courseId, MaterialType type,
			MultipartFile file) {

		Institute institute = instituteRepository.findById(instituteId)
				.orElseThrow(() -> new RuntimeException("Institute not found"));

		Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));

		// Save file
		String fileUrl = fileStorageService.saveFile(file);

		StudyMaterial material = new StudyMaterial();
		material.setTitle(title);
		material.setInstitute(institute);
		material.setCourse(course);
		material.setType(type);
		material.setFileUrl(fileUrl);

		StudyMaterial saved = materialRepository.save(material);

		return mapToDTO(saved);
	}

	// Student View Materials
	@Override
	public List<MaterialResponseDTO> getMaterialsByCourseAndType(Long courseId, MaterialType type) {

		return materialRepository.findByCourseIdAndType(courseId, type).stream().map(this::mapToDTO).toList();
	}

	// get all the study material
	@Override
	public List<MaterialResponseDTO> getAllMaterials(Long instituteId) {

		return materialRepository.findByInstituteId(instituteId)
				.stream()
				.map(this::mapToDTO)
				.toList();
	}

	// get all the study material by course
	@Override
	public List<MaterialResponseDTO> getMaterialsByCourse(Long courseId) {

		return materialRepository.findByCourseId(courseId)
				.stream()
				.map(this::mapToDTO)
				.toList();
	}

	// Update the Study Material
	@Override
	public MaterialResponseDTO updateMaterial(Long materialId, String title, MaterialType type, Long courseId,
			MultipartFile file) {

		StudyMaterial material = materialRepository.findById(materialId)
				.orElseThrow(() -> new RuntimeException("Material not found"));

		// Update Title if provided
		if (title != null && !title.isEmpty()) {
			material.setTitle(title);
		}

		// update the type
		if (type != null) {
			material.setType(type);
		}

		// update the course
		if (courseId != null) {
			Course course = courseRepository.findById(courseId)
					.orElseThrow(() -> new RuntimeException("Course not found"));
			material.setCourse(course);
		}

		// Replace File if provided
		if (file != null && !file.isEmpty()) {

			// Delete old file if exists
			if (material.getFileUrl() != null) {
				fileStorageService.deleteFile(material.getFileUrl());
			}

			// Save new file
			String newFileUrl = fileStorageService.saveFile(file);
			material.setFileUrl(newFileUrl);
		}

		StudyMaterial updated = materialRepository.save(material);

		return mapToDTO(updated);
	}

	// delete study material
	@Override
	public void deleteMaterial(Long materialId) {

		StudyMaterial material = materialRepository.findById(materialId)
				.orElseThrow(() -> new RuntimeException("Material not found"));

		// ✅ Delete file first
		fileStorageService.deleteFile(material.getFileUrl());

		// ✅ Delete DB record
		materialRepository.delete(material);
	}

	// Download Material
	@Override
	public ResponseEntity<Resource> downloadMaterial(Long materialId) {

		StudyMaterial material = materialRepository.findById(materialId)
				.orElseThrow(() -> new RuntimeException("Material not found"));

		if (material.getFileUrl() == null) {
			throw new RuntimeException("No file uploaded");
		}

		String fileName = material.getFileUrl().replace("/uploads/", "");

		Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();

		try {
			Resource resource = new UrlResource(filePath.toUri());

			if (!resource.exists()) {
				throw new RuntimeException("File not found on server");
			}

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
					.body(resource);

		} catch (Exception e) {
			throw new RuntimeException("Download failed");
		}
	}

	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	private MaterialResponseDTO mapToDTO(StudyMaterial material) {
		MaterialResponseDTO dto = new MaterialResponseDTO();
		dto.setId(material.getId());
		dto.setTitle(material.getTitle());
		// Update URL to point to download endpoint
		dto.setFileUrl("/download/" + material.getId());
		dto.setType(material.getType());

		if (material.getFileUrl() != null) {
			dto.setFileName(material.getFileUrl().substring(material.getFileUrl().lastIndexOf("/") + 1));
		}

		dto.setInstituteId(material.getInstitute().getId());
		dto.setCourseId(material.getCourse().getId());

		return dto;
	}

	@Override
	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<MaterialResponseDTO> getMaterialsForLoggedStudent(String email) {
		Student student = studentRepository.findByUserEmail(email)
				.orElseThrow(() -> new RuntimeException("Student not found"));

		// Use courseId as primary filter
		return materialRepository.findByCourseId(student.getCourse().getId())
				.stream().map(this::mapToDTO).toList();
	}

	@Override
	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<MaterialResponseDTO> getMaterialsByTypeForLoggedStudent(String email, MaterialType type) {
		Student student = studentRepository.findByUserEmail(email)
				.orElseThrow(() -> new RuntimeException("Student not found"));

		return materialRepository.findByCourseIdAndType(student.getCourse().getId(), type)
				.stream().map(this::mapToDTO).toList();
	}
}
