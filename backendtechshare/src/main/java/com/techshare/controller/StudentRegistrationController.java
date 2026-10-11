package com.techshare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.techshare.dto.StudentRegistrationRequestDTO;
import com.techshare.service.StudentRegistrationService;

@RestController
@RequestMapping("/api/registration")
public class StudentRegistrationController {

    @Autowired
    private StudentRegistrationService registrationService;

    // Student sends registration request
    @PostMapping("/request")
    public ResponseEntity<String> registerStudent(
            @RequestBody StudentRegistrationRequestDTO dto) {
        return ResponseEntity.ok(
                registrationService.sendRequest(dto));
    }

}
