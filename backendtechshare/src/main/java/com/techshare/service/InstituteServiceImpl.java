//package com.techshare.service;
//
//import java.util.List;
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.techshare.dto.InstituteRegisterRequest;
//import com.techshare.entities.Institute;
//import com.techshare.entities.Role;
//import com.techshare.entities.User;
//import com.techshare.repositories.InstituteRepository;
//import com.techshare.repositories.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class InstituteServiceImpl implements InstituteService {
//
//    private final InstituteRepository instituteRepository;
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    @Override
//    public Institute registerInstitute(InstituteRegisterRequest request) {
//
//        // ✅ Check username exists
//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException("Username already exists!");
//        }
//
//        // ✅ Create User
//        User user = new User();
//        user.setEmail(request.getEmail());
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setRole(Role.INSTITUTE);
//
//        user = userRepository.save(user);
//
//        // ✅ Create Institute
//        Institute institute = new Institute();
//        institute.setInstituteName(request.getInstituteName());
//        institute.setInstituteType(request.getInstituteType());
//        institute.setPhoneNo(request.getPhoneNo());
//        institute.setAddress(request.getAddress());
//        institute.setUser(user);
//
//        return instituteRepository.save(institute);
//
//    }
//
//	@Override
//	public List<Institute> getAllInstitutes() {
//		  return instituteRepository.findAll();
//	}
//
//	@Override
//	public Institute getInstituteById(Long id) {
//		return instituteRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Institute not found"));
//	}
//
//	@Override
//	public Institute updateInstitute(Long id, InstituteRegisterRequest request) {
//		 Institute institute = getInstituteById(id);
//
//         institute.setInstituteName(request.getInstituteName());
//         institute.setInstituteType(request.getInstituteType());
//         institute.setPhoneNo(request.getPhoneNo());
//         institute.setAddress(request.getAddress());
//
//         return instituteRepository.save(institute);
//	}
//
//	@Override
//	public void deleteInstitute(Long id) {
//		  Institute institute = getInstituteById(id);
//          instituteRepository.delete(institute);
//	}
//}

package com.techshare.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.techshare.custom_exception.ApiException;
import com.techshare.dto.InstituteRegisterRequest;
import com.techshare.dto.InstituteResponseDTO;
import com.techshare.dto.InstituteUpdateRequestDTO;
import com.techshare.entities.ApiResponse;
import com.techshare.entities.Institute;
import com.techshare.entities.Role;
import com.techshare.entities.User;
import com.techshare.repositories.InstituteRepository;
import com.techshare.repositories.StudentRepository;
import com.techshare.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class InstituteServiceImpl implements InstituteService {

    private final InstituteRepository instituteRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    @Override
    public InstituteResponseDTO registerInstitute(InstituteRegisterRequest request) {

        // ✅ Check if email is verified
        if (!request.isVerified()) {
            // Double check with OtpService to be sure (optional, but safer)
            throw new ApiException("Email verification is required!");
        }

        // Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Email already registered!");
        }

        // Create User
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.INSTITUTE);

        User savedUser = userRepository.save(user);

        // Map DTO → Institute entity
        Institute institute = modelMapper.map(request, Institute.class);
        institute.setUser(savedUser);

        Institute savedInstitute = instituteRepository.save(institute);

        // Map Entity → Response DTO
        InstituteResponseDTO response = modelMapper.map(savedInstitute, InstituteResponseDTO.class);
        response.setEmail(savedUser.getEmail());

        return response;
    }

    @Override
    public InstituteResponseDTO updateInstitute(Long id, InstituteUpdateRequestDTO dto) {

        Institute institute = instituteRepository.findById(id)
                .orElseThrow(() -> new ApiException("Institute not found with id : " + id));

        // Check if email is being changed and if it's already taken
        if (!institute.getUser().getEmail().equals(dto.getEmail())) {
            if (userRepository.existsByEmail(dto.getEmail())) {
                throw new ApiException("Email already in use!");
            }
            // Update user email
            institute.getUser().setEmail(dto.getEmail());
            userRepository.save(institute.getUser());
        }

        // Update institute fields
        modelMapper.map(dto, institute);

        Institute updated = instituteRepository.save(institute);

        InstituteResponseDTO response = modelMapper.map(updated, InstituteResponseDTO.class);

        response.setEmail(updated.getUser().getEmail());

        return response;
    }

    @Override
    public ApiResponse deleteInstitute(Long instituteId) {

        Institute institute = instituteRepository.findById(instituteId)
                .orElseThrow(() -> new ApiException("Institute not found with id : " + instituteId));

        instituteRepository.delete(institute);

        return new ApiResponse("Institute deleted successfully", "Success");
    }

    @Override
    public List<InstituteResponseDTO> getAllInstitutes() {

        List<Institute> institutes = instituteRepository.findAll();

        return institutes.stream()
                .map(inst -> {
                    InstituteResponseDTO dto = modelMapper.map(inst, InstituteResponseDTO.class);

                    dto.setEmail(inst.getUser().getEmail()); // manual mapping
                    dto.setStudentCount(studentRepository.countByInstituteId(inst.getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public InstituteResponseDTO getInstituteById(Long id) {

        Institute institute = instituteRepository.findById(id)
                .orElseThrow(() -> new ApiException("Institute not found with id " + id));

        InstituteResponseDTO dto = modelMapper.map(institute, InstituteResponseDTO.class);
        dto.setEmail(institute.getUser().getEmail());
        dto.setStudentCount(studentRepository.countByInstituteId(id));

        return dto;
    }

    @Override
    public long countUsersByRole(Role role) {
        return userRepository.countByRole(role);
    }

    @Override
    public InstituteResponseDTO getInstituteByEmail(String email) {
        Institute institute = instituteRepository.findByUserEmail(email)
                .orElseThrow(() -> new ApiException("Institute not found for email: " + email));

        InstituteResponseDTO dto = modelMapper.map(institute, InstituteResponseDTO.class);
        dto.setEmail(email);
        dto.setStudentCount(studentRepository.countByInstituteId(institute.getId()));
        return dto;
    }

    @Override
    public java.util.List<com.techshare.dto.StudentResponseDTO> getStudentsByCourse(Long instituteId, Long courseId) {
        return studentRepository.findByInstituteIdAndCourseId(instituteId, courseId)
                .stream()
                .map(s -> com.techshare.dto.StudentResponseDTO.builder()
                        .id(s.getId())
                        .studentName(s.getStudentName())
                        .email(s.getUser().getEmail())
                        .gender(s.getGender())
                        .mobileNo(s.getMobileNo())
                        .dob(s.getDob())
                        .courseName(s.getCourse().getCourseName())
                        .build())
                .collect(java.util.stream.Collectors.toList());
    }

    @Override
    public List<com.techshare.dto.StudentResponseDTO> getAllStudents(Long instituteId) {
        return studentRepository.findByInstituteId(instituteId)
                .stream()
                .map(s -> com.techshare.dto.StudentResponseDTO.builder()
                        .id(s.getId())
                        .studentName(s.getStudentName())
                        .email(s.getUser().getEmail())
                        .gender(s.getGender())
                        .mobileNo(s.getMobileNo())
                        .dob(s.getDob())
                        .courseName(s.getCourse().getCourseName())
                        .build())
                .collect(java.util.stream.Collectors.toList());
    }
}
