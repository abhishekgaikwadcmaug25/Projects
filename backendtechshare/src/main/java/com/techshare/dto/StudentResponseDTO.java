package com.techshare.dto;

import com.techshare.entities.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponseDTO {
    private Long id;
    private String studentName;
    private String email;
    private Gender gender;
    private String mobileNo;
    private LocalDate dob;
    private String courseName;
    private Long courseId;
}
