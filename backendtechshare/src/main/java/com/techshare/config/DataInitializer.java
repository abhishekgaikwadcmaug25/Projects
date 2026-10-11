
   package com.techshare.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.techshare.entities.Role;
import com.techshare.entities.User;
import com.techshare.repositories.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepo,
            PasswordEncoder passwordEncoder) {

        return args -> {

            String adminEmail = "admin@techshare.com";

            if (!userRepo.existsByEmail(adminEmail)) {

                User admin = new User();
                admin.setEmail(adminEmail);
                admin.setPasswordHash(passwordEncoder.encode("Admin@123"));
                admin.setRole(Role.ADMIN);
                admin.setActive(true);

                userRepo.save(admin);

                System.out.println("Admin user created successfully");
            }
            else {
                System.out.println("Admin already exists");
            }
        };
    }
}
