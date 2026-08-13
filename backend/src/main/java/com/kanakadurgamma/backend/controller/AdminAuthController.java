package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.Admin;
import com.kanakadurgamma.backend.repository.AdminRepository;
import com.kanakadurgamma.backend.service.AdminAuthService;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AdminAuthController {

    private final AdminAuthService adminAuthService;
    private final AdminRepository adminRepository;

    public AdminAuthController(
            AdminAuthService adminAuthService,
            AdminRepository adminRepository) {

        this.adminAuthService = adminAuthService;
        this.adminRepository = adminRepository;
    }

    // =========================================
    // ADMIN LOGIN
    // =========================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request,
            HttpSession session) {

        try {

            String username = request.get("username");
            String password = request.get("password");

            if (username == null
                    || username.isBlank()
                    || password == null
                    || password.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "success",
                                        false,
                                        "message",
                                        "Username and password are required"
                                )
                        );
            }

            boolean authenticated =
                    adminAuthService.authenticate(
                            username,
                            password
                    );

            if (!authenticated) {

                return ResponseEntity
                        .status(401)
                        .body(
                                Map.of(
                                        "success",
                                        false,
                                        "message",
                                        "Invalid username or password"
                                )
                        );
            }

            session.setAttribute(
                    "ADMIN_AUTHENTICATED",
                    true
            );

            session.setAttribute(
                    "ADMIN_USERNAME",
                    username.trim()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "success",
                            true,
                            "username",
                            username.trim(),
                            "message",
                            "Admin login successful"
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "success",
                                    false,
                                    "message",
                                    "Unable to process admin login"
                            )
                    );
        }
    }

    // =========================================
    // CHECK CURRENT SESSION
    // =========================================

    @GetMapping("/session")
    public ResponseEntity<?> checkSession(
            HttpSession session) {

        Object authenticated =
                session.getAttribute(
                        "ADMIN_AUTHENTICATED"
                );

        Object username =
                session.getAttribute(
                        "ADMIN_USERNAME"
                );

        if (Boolean.TRUE.equals(authenticated)) {

            return ResponseEntity.ok(
                    Map.of(
                            "authenticated",
                            true,
                            "username",
                            username != null
                                    ? username.toString()
                                    : ""
                    )
            );
        }

        return ResponseEntity.ok(
                Map.of(
                        "authenticated",
                        false
                )
        );
    }

    // =========================================
    // CHANGE ADMIN PASSWORD
    // =========================================

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String, String> request,
            HttpSession session) {

        try {

            Object authenticated =
                    session.getAttribute(
                            "ADMIN_AUTHENTICATED"
                    );

            Object usernameAttribute =
                    session.getAttribute(
                            "ADMIN_USERNAME"
                    );

            if (!Boolean.TRUE.equals(authenticated)
                    || usernameAttribute == null) {

                return ResponseEntity
                        .status(401)
                        .body(
                                Map.of(
                                        "success",
                                        false,
                                        "message",
                                        "Admin session expired. Please login again."
                                )
                        );
            }

            String currentPassword =
                    request.get("currentPassword");

            String newPassword =
                    request.get("newPassword");

            if (currentPassword == null
                    || currentPassword.isBlank()
                    || newPassword == null
                    || newPassword.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "success",
                                        false,
                                        "message",
                                        "Current password and new password are required."
                                )
                        );
            }

            if (newPassword.length() < 8) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "success",
                                        false,
                                        "message",
                                        "New password must contain at least 8 characters."
                                )
                        );
            }

            String username =
                    usernameAttribute.toString();

            Admin admin =
                    adminRepository
                            .findByUsername(username)
                            .orElse(null);

            if (admin == null
                    || !admin.isActive()) {

                return ResponseEntity
                        .status(404)
                        .body(
                                Map.of(
                                        "success",
                                        false,
                                        "message",
                                        "Admin account was not found."
                                )
                        );
            }

            boolean currentPasswordCorrect =
                    adminAuthService.authenticate(
                            username,
                            currentPassword
                    );

            if (!currentPasswordCorrect) {

                return ResponseEntity
                        .status(401)
                        .body(
                                Map.of(
                                        "success",
                                        false,
                                        "message",
                                        "Current password is incorrect."
                                )
                        );
            }

            admin.setPasswordHash(
                    adminAuthService.hashPassword(
                            newPassword
                    )
            );

            adminRepository.save(admin);

            return ResponseEntity.ok(
                    Map.of(
                            "success",
                            true,
                            "message",
                            "Password changed successfully."
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "success",
                                    false,
                                    "message",
                                    "Unable to change admin password."
                            )
                    );
        }
    }

    // =========================================
    // ADMIN LOGOUT
    // =========================================

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpSession session) {

        session.invalidate();

        return ResponseEntity.ok(
                Map.of(
                        "success",
                        true,
                        "message",
                        "Logged out successfully"
                )
        );
    }
}