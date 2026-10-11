package com.techshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    @Autowired
    private EmailService emailService;

    // Store OTPs in memory: Email -> OTP
    // In production, use Redis or Database with expiration
    private Map<String, String> otpStorage = new ConcurrentHashMap<>();

    // Store verified emails
    private Map<String, Boolean> verifiedEmails = new ConcurrentHashMap<>();

    public void generateAndSendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // 6 digit OTP
        otpStorage.put(email, otp);
        verifiedEmails.remove(email); // Reset verification status

        try {
            System.out.println("Attempting to send OTP " + otp + " to " + email);
            emailService.sendSimpleEmail(email, "TechShare Registration OTP", "Your One Time Password is: " + otp);
            System.out.println("OTP sent successfully.");
        } catch (Exception e) {
            System.err.println("OTP Email Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Email Send Failed: " + e.getMessage());
        }
    }

    public boolean verifyOtp(String email, String otp) {
        if (otpStorage.containsKey(email) && otpStorage.get(email).equals(otp)) {
            otpStorage.remove(email); // Remove logic after success
            verifiedEmails.put(email, true);
            return true;
        }
        return false;
    }

    public boolean isEmailVerified(String email) {
        return verifiedEmails.getOrDefault(email, false);
    }
}
