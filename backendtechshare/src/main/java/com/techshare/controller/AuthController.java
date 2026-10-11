package com.techshare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.techshare.dto.AuthRequest;
import com.techshare.dto.AuthResponse;
import com.techshare.security.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest request) {

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String rawRole = userDetails.getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        // Convert ROLE_STUDENT -> STUDENT for frontend compatibility
        String role = rawRole.replace("ROLE_", "");

        // ✅ SECURITY GUARD: If Student, check if approved
        if (role.equals("STUDENT")) {
            if (!registrationService.canAccessInstitute(userDetails.getUsername())) {
                return ResponseEntity.status(403).body(new AuthResponse(
                        "Your registration is still pending approval by the institute.",
                        role,
                        false));
            }
        }

        // ✅ Generate token
        String token = jwtService.generateToken(userDetails.getUsername(), rawRole);

        return ResponseEntity.ok(new AuthResponse(token, role));
    }

    @Autowired
    private com.techshare.service.StudentRegistrationService registrationService;

    @Autowired
    private com.techshare.service.InstituteService instituteService;

    @Autowired
    private com.techshare.service.CourseService courseService;

    @GetMapping("/institutes")
    public ResponseEntity<java.util.List<com.techshare.dto.InstituteResponseDTO>> getInstitutes() {
        return ResponseEntity.ok(instituteService.getAllInstitutes());
    }

    @GetMapping("/institutes/{id}/courses")
    public ResponseEntity<java.util.List<com.techshare.dto.CourseResponseDTO>> getCourses(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCoursesByInstitute(id));
    }

    @Autowired
    private com.techshare.service.OtpService otpService;

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        otpService.generateAndSendOtp(email);
        return ResponseEntity.ok("OTP sent successfully to " + email);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Boolean> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = otpService.verifyOtp(email, otp);
        return ResponseEntity.ok(isValid);
    }
}
