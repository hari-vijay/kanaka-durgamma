package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.DeekshaRegistration;
import com.kanakadurgamma.backend.repository.DeekshaRegistrationRepository;
import com.kanakadurgamma.backend.service.CloudinaryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/deeksha")
@CrossOrigin(origins = "http://localhost:5173")
public class DeekshaController {

    private final DeekshaRegistrationRepository repository;
    private final CloudinaryService cloudinaryService;

    public DeekshaController(
            DeekshaRegistrationRepository repository,
            CloudinaryService cloudinaryService) {

        this.repository = repository;
        this.cloudinaryService = cloudinaryService;
    }


    // =========================================
    // PUBLIC - REGISTER DEEKSHA
    // =========================================

    @PostMapping("/register")
    public ResponseEntity<?> registerDeeksha(

            @RequestParam("fullName")
            String fullName,

            @RequestParam("phone")
            String phone,

            @RequestParam(value = "village",
                    required = false)
            String village,

            @RequestParam(value = "deekshaType",
                    required = false)
            String deekshaType,

            @RequestParam("startDate")
            String startDate,

            @RequestParam(value = "file",
                    required = false)
            MultipartFile file) {

        try {

            // ---------------------------------
            // Validate basic details
            // ---------------------------------

            if (fullName == null || fullName.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Full name is required"
                                )
                        );
            }

            if (phone == null || phone.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Phone number is required"
                                )
                        );
            }

            if (startDate == null || startDate.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Deeksha date is required"
                                )
                        );
            }


            // ---------------------------------
            // Create registration
            // ---------------------------------

            DeekshaRegistration registration =
                    new DeekshaRegistration();

            registration.setFullName(fullName);
            registration.setPhone(phone);
            registration.setVillage(village);
            registration.setDeekshaType(deekshaType);

            registration.setStartDate(
                    java.time.LocalDate.parse(startDate)
            );

            registration.setStatus("ACTIVE");

            registration.setCreatedAt(
                    LocalDateTime.now()
            );

            registration.setUpdatedAt(
                    LocalDateTime.now()
            );


            // ---------------------------------
            // Upload profile photo to Cloudinary
            // ---------------------------------

            if (file != null && !file.isEmpty()) {

                String imageUrl =
                        cloudinaryService.uploadImage(file);

                registration.setProfilePhotoPath(
                        imageUrl
                );
            }


            // ---------------------------------
            // Save registration
            // ---------------------------------

            DeekshaRegistration saved =
                    repository.save(registration);

            return ResponseEntity.ok(saved);

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "error",
                                    "Failed to upload profile photo"
                            )
                    );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "error",
                                    "Failed to complete Deeksha registration"
                            )
                    );
        }
    }


    // =========================================
    // ADMIN - UPDATE DEEKSHA REGISTRATION
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDeeksha(
            @PathVariable Long id,
            @RequestBody DeekshaRegistration updatedRegistration) {

        try {

            DeekshaRegistration registration =
                    repository.findById(id).orElse(null);

            if (registration == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            // ---------------------------------
            // Update editable fields
            // ---------------------------------

            if (updatedRegistration.getFullName() != null) {

                registration.setFullName(
                        updatedRegistration.getFullName()
                );
            }

            if (updatedRegistration.getPhone() != null) {

                registration.setPhone(
                        updatedRegistration.getPhone()
                );
            }

            if (updatedRegistration.getVillage() != null) {

                registration.setVillage(
                        updatedRegistration.getVillage()
                );
            }

            if (updatedRegistration.getDeekshaType() != null) {

                registration.setDeekshaType(
                        updatedRegistration.getDeekshaType()
                );
            }

            if (updatedRegistration.getStartDate() != null) {

                registration.setStartDate(
                        updatedRegistration.getStartDate()
                );
            }

            if (updatedRegistration.getStatus() != null) {

                registration.setStatus(
                        updatedRegistration.getStatus()
                );
            }

            registration.setUpdatedAt(
                    LocalDateTime.now()
            );


            // ---------------------------------
            // Save updated registration
            // ---------------------------------

            DeekshaRegistration saved =
                    repository.save(registration);

            return ResponseEntity.ok(saved);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "error",
                                    "Failed to update Deeksha registration"
                            )
                    );
        }
    }


    // =========================================
    // ADMIN - DELETE DEEKSHA REGISTRATION
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeeksha(
            @PathVariable Long id) {

        try {

            DeekshaRegistration registration =
                    repository.findById(id).orElse(null);

            if (registration == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            // ---------------------------------
            // Delete profile photo from Cloudinary
            // ---------------------------------

            if (registration.getProfilePhotoPath() != null
                    && registration.getProfilePhotoPath()
                    .contains("res.cloudinary.com")) {

                try {

                    cloudinaryService.deleteImage(
                            registration.getProfilePhotoPath()
                    );

                } catch (Exception e) {

                    e.printStackTrace();
                }
            }


            // ---------------------------------
            // Delete registration from MySQL
            // ---------------------------------

            repository.delete(registration);

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Deeksha registration deleted successfully"
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "error",
                                    "Failed to delete Deeksha registration"
                            )
                    );
        }
    }


    // =========================================
    // PUBLIC - ACTIVE DEEKSHA COUNT
    // =========================================

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getDeekshaCount() {

        long count =
                repository.countByStatus("ACTIVE");

        return ResponseEntity.ok(
                Map.of("count", count)
        );
    }


    // =========================================
    // ADMIN - GET ALL REGISTRATIONS
    // =========================================

    @GetMapping("/registrations")
    public ResponseEntity<List<DeekshaRegistration>>
    getAllRegistrations() {

        List<DeekshaRegistration> registrations =
                repository.findAll();

        return ResponseEntity.ok(registrations);
    }
}