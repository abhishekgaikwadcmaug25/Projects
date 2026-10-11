package com.techshare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techshare.dto.AnnouncementResponseDTO;
import com.techshare.dto.AssignmentResponseDTO;
import com.techshare.dto.MaterialResponseDTO;
import com.techshare.dto.ScheduleResponseDTO;
import com.techshare.entities.MaterialType;
import com.techshare.service.AnnouncementService;
import com.techshare.service.AssignmentService;
import com.techshare.service.ScheduleService;
import com.techshare.service.StudyMaterialService;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private com.techshare.repositories.StudentRepository studentRepository;

    @Autowired
    private AnnouncementService announcementService;

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private StudyMaterialService studyMaterialService;


    @Transactional(readOnly = true)
    @GetMapping("/profile")
    public com.techshare.dto.StudentResponseDTO getProfile(java.security.Principal principal) {
        com.techshare.entities.Student student = studentRepository.findByUserEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return com.techshare.dto.StudentResponseDTO.builder()
                .id(student.getId())
                .studentName(student.getStudentName())
                .email(student.getUser().getEmail())
                .gender(student.getGender())
                .mobileNo(student.getMobileNo())
                .dob(student.getDob())
                .courseName(student.getCourse().getCourseName())
                .courseId(student.getCourse().getId()) // I need to make sure courseId is in DTO
                .build();
    }


    @GetMapping("/announcements/{courseId}")
    public List<AnnouncementResponseDTO> getAnnouncements(@PathVariable Long courseId) {
        return announcementService.getAnnouncementsByCourse(courseId);//  Announcements
    }


    @GetMapping("/schedule/{courseId}")
    public List<ScheduleResponseDTO> getSchedule(@PathVariable Long courseId) {
        return scheduleService.getSchedulesByCourse(courseId);// View Schedule
    }


    @GetMapping("/assignments")
    public List<AssignmentResponseDTO> getAssignments(java.security.Principal principal) {
        return assignmentService.getAssignmentsForLoggedStudent(principal.getName());
    }


    @GetMapping("/assignments/download/{assignmentId}")
    public ResponseEntity<Resource> downloadAssignment(@PathVariable Long assignmentId) throws Exception {
        return assignmentService.downloadAssignmentFile(assignmentId);
    }


    @GetMapping("/materials")
    public List<MaterialResponseDTO> getMaterials(java.security.Principal principal) {
        return studyMaterialService.getMaterialsForLoggedStudent(principal.getName());//studyMaterial
    }


    @GetMapping("/materials/download/{materialId}")
    public ResponseEntity<Resource> downloadMaterial(@PathVariable Long materialId) throws Exception {
        return studyMaterialService.downloadMaterial(materialId);
    }


    @GetMapping("/materials/type/{type}")
    public List<MaterialResponseDTO> getMaterialsByType(
            java.security.Principal principal,
            @PathVariable MaterialType type) {

        return studyMaterialService.getMaterialsByTypeForLoggedStudent(principal.getName(), type);
    }
}
