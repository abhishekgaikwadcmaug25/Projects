package com.techshare.service;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.techshare.dto.AssignmentResponseDTO;
import com.techshare.dto.AssignmentUpdateDTO;
import com.techshare.entities.Assignment;
import com.techshare.entities.Course;
import com.techshare.entities.Institute;
import com.techshare.entities.Student;
import com.techshare.repositories.AssignmentRepository;
import com.techshare.repositories.CourseRepository;
import com.techshare.repositories.InstituteRepository;
import com.techshare.repositories.StudentRepository;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private InstituteRepository instituteRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private StudentRepository studentRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // Add Assignment
    @Override
    public AssignmentResponseDTO addAssignment(String title,
            String description,
            String dueDate,
            Integer totalMarks,
            Long instituteId,
            Long courseId,
            MultipartFile file) throws Exception {

        // FETCHING THE INSTITUTE
        Institute institute = instituteRepository.findById(instituteId)
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        // FETCHING THE COURSE
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        String fileUrl = fileStorageService.saveFile(file);

        Assignment assignment = new Assignment();
        assignment.setTitle(title);
        assignment.setDescription(description);
        assignment.setDueDate(LocalDate.parse(dueDate));
        assignment.setTotalMarks(totalMarks);
        assignment.setInstitute(institute);
        assignment.setCourse(course);
        assignment.setFileUrl(fileUrl);

        // Save Assignment
        Assignment saved = assignmentRepository.save(assignment);

        return mapToDTO(saved);
    }

    // List Of Assignment So That Student Can Access
    @Override
    public List<AssignmentResponseDTO> viewAssignmentsForStudent(Long instituteId, Long courseId) {

        List<Assignment> assignments = assignmentRepository.findByInstituteIdAndCourseId(instituteId, courseId);

        return assignments.stream().map(this::mapToDTO).toList();
    }

    // Update Assignment
    @Override
    public AssignmentResponseDTO updateAssignment(
            Long assignmentId,
            AssignmentUpdateDTO dto,
            MultipartFile file) throws Exception {

        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        // ✅ Update only if field is not null
        if (dto.getTitle() != null)
            assignment.setTitle(dto.getTitle());

        if (dto.getDescription() != null)
            assignment.setDescription(dto.getDescription());

        if (dto.getDueDate() != null)
            assignment.setDueDate(LocalDate.parse(dto.getDueDate()));

        if (dto.getTotalMarks() != null)
            assignment.setTotalMarks(dto.getTotalMarks());

        if (dto.getCourseId() != null) {
            Course course = courseRepository.findById(dto.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            assignment.setCourse(course);
        }

        // ✅ Replace file only if provided
        if (file != null && !file.isEmpty()) {

            // delete old file
            fileStorageService.deleteFile(assignment.getFileUrl());

            // save new file
            String newFileUrl = fileStorageService.saveFile(file);
            assignment.setFileUrl(newFileUrl);
        }

        Assignment updated = assignmentRepository.save(assignment);

        return mapToDTO(updated);
    }

    // Delete Assignment
    @Override
    public void deleteAssignment(Long assignmentId) {

        // Find Assignment By Id
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        // If file there then delete
        if (assignment.getFileUrl() != null) {
            fileStorageService.deleteFile(assignment.getFileUrl());
        }

        assignmentRepository.deleteById(assignmentId);

        System.out.println("Assignment deleted successfully with file.");
    }

    // Assignment by course id
    @Override
    public List<AssignmentResponseDTO> getAssignmentsByCourse(Long courseId) {

        List<Assignment> assignments = assignmentRepository.findByCourseId(courseId);

        return assignments.stream().map(this::mapToDTO).toList();
    }

    @Override
    public List<AssignmentResponseDTO> getAllAssignments() {

        return assignmentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private AssignmentResponseDTO mapToDTO(Assignment assignment) {

        AssignmentResponseDTO dto = new AssignmentResponseDTO();

        dto.setId(assignment.getId());
        dto.setTitle(assignment.getTitle());
        dto.setDescription(assignment.getDescription());
        dto.setDueDate(assignment.getDueDate());
        dto.setTotalMarks(assignment.getTotalMarks());
        dto.setStatus(assignment.getStatus());

        dto.setInstituteId(assignment.getInstitute().getId());
        dto.setCourseId(assignment.getCourse().getId());

        if (assignment.getFileUrl() != null) {
            dto.setFileUrl("/download/" + assignment.getId());
            dto.setFileName(assignment.getFileUrl().substring(assignment.getFileUrl().lastIndexOf("/") + 1));
        } else {
            dto.setFileUrl(null);
        }

        return dto;
    }

    // Download Assignment
    @Override
    public ResponseEntity<Resource> downloadAssignmentFile(Long assignmentId) throws Exception {

        // ✅ Step 1: Find Assignment from DB
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        // ✅ Step 2: Get fileUrl from DB
        String fileUrl = assignment.getFileUrl();

        // ✅ Step 3: Add this check HERE
        if (fileUrl == null) {
            throw new RuntimeException("No file uploaded for this assignment");
        }

        // ✅ Step 4: Extract file name
        String fileName = fileUrl.replace("/uploads/", "");

        // ✅ Step 5: Locate file path
        Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();

        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found on server");
        }

        // ✅ Step 6: Return file for download
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    // if student logged in then he can directly access the assignment
    @Override
    public List<AssignmentResponseDTO> getAssignmentsForLoggedStudent(String email) {

        Student student = studentRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Long instituteId = student.getInstitute().getId();
        Long courseId = student.getCourse().getId();

        List<Assignment> assignments = assignmentRepository.findByInstituteIdAndCourseId(instituteId, courseId);

        return assignments.stream().map(this::mapToDTO).toList();
    }

    @Override
    public List<AssignmentResponseDTO> getAssignmentsByInstitute(Long instituteId) {
        return assignmentRepository.findByInstituteId(instituteId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }
}
