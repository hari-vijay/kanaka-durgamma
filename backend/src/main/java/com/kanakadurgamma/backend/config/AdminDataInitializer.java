package com.kanakadurgamma.backend.config;

import com.kanakadurgamma.backend.entity.Admin;
import com.kanakadurgamma.backend.repository.AdminRepository;
import com.kanakadurgamma.backend.service.AdminAuthService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class AdminDataInitializer {

    @Bean
    CommandLineRunner createDefaultAdmin(
            AdminRepository repository,
            AdminAuthService authService) {

        return args -> {

            if (repository.findByUsername("admin").isPresent()) {
                return;
            }

            Admin admin = new Admin();

            admin.setUsername("admin");

            admin.setPasswordHash(
                    authService.hashPassword(
                            "Admin@123"
                    )
            );

            admin.setRole("ADMIN");

            admin.setActive(true);

            admin.setCreatedAt(
                    LocalDateTime.now()
            );

            repository.save(admin);

            System.out.println(
                    "========================================="
            );

            System.out.println(
                    "Default admin account created"
            );

            System.out.println(
                    "Username: admin"
            );

            System.out.println(
                    "Password: Admin@123"
            );

            System.out.println(
                    "========================================="
            );
        };
    }
}