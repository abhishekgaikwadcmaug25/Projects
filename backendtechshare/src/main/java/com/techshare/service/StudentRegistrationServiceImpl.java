package com.techshare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.techshare.dto.StudentRegistrationRequestDTO;
import com.techshare.dto.StudentRequestResponseDTO;
import com.techshare.entities.*;
import com.techshare.repositories.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentRegistrationServiceImpl implements StudentRegistrationService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private InstituteRepository instituteRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StudentInstituteRequestRepository requestRepo;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    // Register as Student
    @Transactional
    @Override
    public String sendRequest(StudentRegistrationRequestDTO dto) {

        if (dto.getInstituteId() == null || dto.getCourseId() == null) {
            throw new RuntimeException("Institute ID and Course ID are required");
        }

        Institute institute = instituteRepo.findById(dto.getInstituteId())
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        Course course = courseRepo.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        User user = userRepo.findByEmail(dto.getEmail())
                .orElseGet(() -> {
                    User u = new User();
                    u.setEmail(dto.getEmail());
                    u.setRole(Role.STUDENT);
                    u.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
                    return userRepo.save(u);
                });

        Student student = studentRepo.findByUser(user)
                .orElseGet(() -> {
                    Student s = new Student();
                    s.setStudentName(dto.getStudentName());
                    s.setGender(dto.getGender());
                    s.setDob(dto.getDob());
                    s.setMobileNo(dto.getMobileNo());
                    s.setUser(user);
                    s.setInstitute(institute);
                    s.setCourse(course);
                    return studentRepo.save(s);
                });

        StudentInstituteRequest request = new StudentInstituteRequest();
        request.setStudent(student);
        request.setInstitute(institute);
        request.setCourse(course);
        request.setStatus(RequestStatus.PENDING);

        StudentInstituteRequest savedRequest = requestRepo.save(request);

        return "Request Sent Successfully . Request ID =" + savedRequest.getId();
    }

    // Approve Request
    @Override
    public String approveRequest(Long requestId) {

        StudentInstituteRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.APPROVED);

        // Assign student officially
        Student student = request.getStudent();
        student.setInstitute(request.getInstitute());
        student.setCourse(request.getCourse());

        studentRepo.save(student);
        requestRepo.save(request);

        return "Student request approved successfully!";
    }

    // Reject Request
    @Override
    public String rejectRequest(Long requestId) {

        StudentInstituteRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.REJECTED);
        requestRepo.save(request);

        return "Student request rejected.";
    }

    // Get all the request
    @Transactional
    @Override
    public List<StudentRequestResponseDTO> getAllRequests(Long instituteId) {

        return requestRepo
                .findByInstituteId(instituteId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // Institute View Pending Requests
    @Transactional
    @Override
    public List<StudentRequestResponseDTO> getPendingRequests(Long instituteId) {

        List<StudentInstituteRequest> requests = requestRepo.findRequestsWithStudentUser(
                instituteId,
                RequestStatus.PENDING);

        return requests.stream()
                .map(this::mapToDTO)
                .toList();
    }

    // Student Check Request Status
    @Override
    public StudentRequestResponseDTO getStudentRequestStatus(String email) {

        StudentInstituteRequest request = requestRepo.findByStudent_User_EmailAndStatus(
                email,
                RequestStatus.PENDING)
                .orElseThrow(() -> new RuntimeException("No request found"));

        return mapToDTO(request);
    }

    // ✅ Access Check
    @Override
    public boolean canAccessInstitute(String email) {

        return requestRepo.existsByStudent_User_EmailAndStatus(
                email,
                RequestStatus.APPROVED);
    }

    // DTO Mapper
    private StudentRequestResponseDTO mapToDTO(StudentInstituteRequest request) {

        StudentRequestResponseDTO dto = new StudentRequestResponseDTO();

        dto.setRequestId(request.getId());
        dto.setStudentId(request.getStudent().getId());
        dto.setStudentName(request.getStudent().getStudentName());
        dto.setEmail(request.getStudent().getUser().getEmail());
        dto.setGender(request.getStudent().getGender());
        dto.setMobileNo(request.getStudent().getMobileNo());

        dto.setInstituteId(request.getInstitute().getId());
        dto.setCourseId(request.getCourse().getId());
        dto.setCourseName(request.getCourse().getCourseName());

        dto.setStatus(request.getStatus());

        return dto;
    }
}
