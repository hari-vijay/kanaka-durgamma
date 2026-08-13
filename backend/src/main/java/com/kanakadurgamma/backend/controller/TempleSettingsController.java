package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.TempleSettings;
import com.kanakadurgamma.backend.repository.TempleSettingsRepository;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/temple/settings")
@CrossOrigin(origins = "http://localhost:5173")
public class TempleSettingsController {

    private final TempleSettingsRepository repository;

    private final Path uploadDirectory =
            Paths.get("uploads/temple-settings");

    public TempleSettingsController(
            TempleSettingsRepository repository) {

        this.repository = repository;

        try {

            Files.createDirectories(
                    uploadDirectory
            );

        } catch (IOException e) {

            throw new RuntimeException(
                    "Could not create temple settings upload directory",
                    e
            );
        }
    }

    // =========================================
    // GET SETTINGS
    // =========================================

    @GetMapping
    public ResponseEntity<TempleSettings> getSettings() {

        List<TempleSettings> settings =
                repository.findAll();

        if (settings.isEmpty()) {

            return ResponseEntity
                    .noContent()
                    .build();
        }

        return ResponseEntity.ok(
                settings.get(0)
        );
    }

    // =========================================
    // CREATE / UPDATE SETTINGS
    // =========================================

    @PutMapping
    public ResponseEntity<TempleSettings> saveSettings(
            @RequestBody TempleSettings settings) {

        TempleSettings existing;

        List<TempleSettings> records =
                repository.findAll();

        if (records.isEmpty()) {

            existing = new TempleSettings();

        } else {

            existing = records.get(0);
        }

        // =====================================
        // TEMPLE INFORMATION
        // =====================================

        existing.setTempleName(
                settings.getTempleName()
        );

        existing.setDescription(
                settings.getDescription()
        );

        // =====================================
        // LOCATION
        // =====================================

        existing.setVillage(
                settings.getVillage()
        );

        existing.setDistrict(
                settings.getDistrict()
        );

        existing.setState(
                settings.getState()
        );

        existing.setLocationUrl(
                settings.getLocationUrl()
        );

        // =====================================
        // CONTACT
        // =====================================

        existing.setPhone(
                settings.getPhone()
        );

        existing.setEmail(
                settings.getEmail()
        );

        // =====================================
        // TEMPLE TIMINGS
        // =====================================

        existing.setOpeningTime(
                settings.getOpeningTime()
        );

        existing.setMorningPooja(
                settings.getMorningPooja()
        );

        existing.setAfternoonPooja(
                settings.getAfternoonPooja()
        );

        existing.setEveningAarti(
                settings.getEveningAarti()
        );

        existing.setClosingTime(
                settings.getClosingTime()
        );

        // =====================================
        // SPECIAL TIMINGS
        // =====================================

        existing.setSpecialTimings(
                settings.getSpecialTimings()
        );

        // =====================================
        // UPDATED AT
        // =====================================

        existing.setUpdatedAt(
                LocalDateTime.now().toString()
        );

        // =====================================
        // SAVE
        // =====================================

        TempleSettings saved =
                repository.save(existing);

        return ResponseEntity.ok(saved);
    }

    // =========================================
    // UPLOAD TEMPLE IMAGE
    // =========================================

    @PostMapping("/image/{type}")
    public ResponseEntity<TempleSettings> uploadTempleImage(
            @PathVariable String type,
            @RequestParam("file") MultipartFile file) {

        try {

            if (file == null || file.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .build();
            }

            if (!type.equals("hero")
                    && !type.equals("about")
                    && !type.equals("village")) {

                return ResponseEntity
                        .badRequest()
                        .build();
            }

            String contentType =
                    file.getContentType();

            if (contentType == null
                    || !contentType.startsWith("image/")) {

                return ResponseEntity
                        .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                        .build();
            }

            List<TempleSettings> records =
                    repository.findAll();

            TempleSettings settings;

            if (records.isEmpty()) {

                settings = new TempleSettings();

            } else {

                settings = records.get(0);
            }

            String originalName =
                    file.getOriginalFilename();

            String extension = "";

            if (originalName != null
                    && originalName.contains(".")) {

                extension =
                        originalName.substring(
                                originalName.lastIndexOf(".")
                        );
            }

            String fileName =
                    type +
                    "-" +
                    System.currentTimeMillis() +
                    extension;

            Path target =
                    uploadDirectory.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    target,
                    StandardCopyOption.REPLACE_EXISTING
            );

            String imagePath =
                    "/uploads/temple-settings/" + fileName;

            if (type.equals("hero")) {

                settings.setHeroImagePath(
                        imagePath
                );

            } else if (type.equals("about")) {

                settings.setAboutImagePath(
                        imagePath
                );

            } else {

                settings.setVillageImagePath(
                        imagePath
                );
            }

            settings.setUpdatedAt(
                    LocalDateTime.now().toString()
            );

            TempleSettings saved =
                    repository.save(settings);

            return ResponseEntity.ok(saved);

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .build();
        }
    }

    // =========================================
    // GET TEMPLE IMAGE
    // =========================================

    @GetMapping("/image/{type}")
    public ResponseEntity<Resource> getTempleImage(
            @PathVariable String type) {

        try {

            List<TempleSettings> records =
                    repository.findAll();

            if (records.isEmpty()) {

                return ResponseEntity
                        .notFound()
                        .build();
            }

            TempleSettings settings =
                    records.get(0);

            String imagePath;

            if (type.equals("hero")) {

                imagePath =
                        settings.getHeroImagePath();

            } else if (type.equals("about")) {

                imagePath =
                        settings.getAboutImagePath();

            } else if (type.equals("village")) {

                imagePath =
                        settings.getVillageImagePath();

            } else {

                return ResponseEntity
                        .badRequest()
                        .build();
            }

            if (imagePath == null
                    || imagePath.isBlank()) {

                return ResponseEntity
                        .notFound()
                        .build();
            }

            String fileName =
                    Paths.get(
                            imagePath
                    )
                    .getFileName()
                    .toString();

            Path filePath =
                    uploadDirectory.resolve(
                            fileName
                    );

            if (!Files.exists(filePath)) {

                return ResponseEntity
                        .notFound()
                        .build();
            }

            Resource resource =
                    new FileSystemResource(
                            filePath
                    );

            String contentType =
                    Files.probeContentType(
                            filePath
                    );

            MediaType mediaType =
                    MediaType.IMAGE_JPEG;

            if (contentType != null) {

                try {

                    mediaType =
                            MediaType.parseMediaType(
                                    contentType
                            );

                } catch (Exception ignored) {

                    // Default JPEG
                }
            }

            return ResponseEntity
                    .ok()
                    .contentType(mediaType)
                    .body(resource);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .build();
        }
    }
}