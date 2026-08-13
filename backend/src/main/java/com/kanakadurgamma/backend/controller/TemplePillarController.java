package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.TemplePillar;
import com.kanakadurgamma.backend.repository.TemplePillarRepository;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/temple/pillars")
@CrossOrigin(origins = "http://localhost:5173")
public class TemplePillarController {

    private final TemplePillarRepository repository;

    private final Path uploadDirectory =
            Paths.get("uploads/pillars");


    public TemplePillarController(
            TemplePillarRepository repository) {

        this.repository = repository;

        try {

            Files.createDirectories(
                    uploadDirectory
            );

        } catch (IOException e) {

            throw new RuntimeException(
                    "Could not create upload directory",
                    e
            );
        }
    }


    // =========================================
    // GET ALL ACTIVE PILLARS
    // =========================================

    @GetMapping
    public List<TemplePillar> getPillars() {

        return repository
                .findByActiveTrueOrderByDisplayOrderAsc();
    }


    // =========================================
    // GET PILLAR PHOTO
    // =========================================

    @GetMapping("/{id}/photo")
    public ResponseEntity<Resource> getPillarPhoto(
            @PathVariable Long id) {

        try {

            TemplePillar pillar =
                    repository.findById(id)
                            .orElse(null);

            if (pillar == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            if (pillar.getPhotoPath() == null ||
                    pillar.getPhotoPath().isBlank()) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            String fileName =
                    Paths.get(
                            pillar.getPhotoPath()
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


    // =========================================
    // CREATE PILLAR
    // =========================================

    @PostMapping
    public ResponseEntity<TemplePillar> createPillar(
            @RequestBody TemplePillar pillar) {

        TemplePillar saved =
                repository.save(pillar);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }


    // =========================================
    // UPDATE PILLAR
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<TemplePillar> updatePillar(
            @PathVariable Long id,
            @RequestBody TemplePillar pillar) {

        return repository
                .findById(id)
                .map(existing -> {

                    existing.setName(
                            pillar.getName()
                    );

                    existing.setRole(
                            pillar.getRole()
                    );

                    existing.setDescription(
                            pillar.getDescription()
                    );

                    existing.setDisplayOrder(
                            pillar.getDisplayOrder()
                    );

                    existing.setActive(
                            pillar.getActive()
                    );

                    TemplePillar saved =
                            repository.save(existing);

                    return ResponseEntity.ok(saved);

                })
                .orElseGet(() ->
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }


    // =========================================
    // DELETE PILLAR
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePillar(
            @PathVariable Long id) {

        if (!repository.existsById(id)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        repository.deleteById(id);

        return ResponseEntity
                .noContent()
                .build();
    }


    // =========================================
// UPLOAD PILLAR PHOTO
// =========================================

@PostMapping("/{id}/photo")
public ResponseEntity<TemplePillar> uploadPhoto(
        @PathVariable Long id,
        @RequestParam("file") MultipartFile photo) {

    try {

        TemplePillar pillar =
                repository.findById(id)
                        .orElse(null);

        if (pillar == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        if (photo == null || photo.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }

        String originalName =
                photo.getOriginalFilename();

        String extension = "";

        if (originalName != null &&
                originalName.contains(".")) {

            extension =
                    originalName.substring(
                            originalName.lastIndexOf(".")
                    );
        }

        String fileName =
                "pillar-" +
                id +
                "-" +
                System.currentTimeMillis() +
                extension;

        Path target =
                uploadDirectory.resolve(fileName);

        Files.copy(
                photo.getInputStream(),
                target,
                StandardCopyOption.REPLACE_EXISTING
        );

        pillar.setPhotoPath(
                "/uploads/pillars/" + fileName
        );

        TemplePillar saved =
                repository.save(pillar);

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
}