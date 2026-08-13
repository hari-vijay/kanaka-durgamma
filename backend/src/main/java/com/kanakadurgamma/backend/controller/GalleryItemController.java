package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.GalleryItem;
import com.kanakadurgamma.backend.repository.GalleryItemRepository;
import com.kanakadurgamma.backend.service.CloudinaryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "http://localhost:5173")
public class GalleryItemController {

    private final GalleryItemRepository repository;
    private final CloudinaryService cloudinaryService;

    public GalleryItemController(
            GalleryItemRepository repository,
            CloudinaryService cloudinaryService) {

        this.repository = repository;
        this.cloudinaryService = cloudinaryService;
    }

    // =========================================
    // PUBLIC GALLERY
    // =========================================

    @GetMapping
    public List<GalleryItem> getGalleryItems() {

        return repository
                .findByActiveTrueOrderByCreatedAtDesc();
    }


    // =========================================
    // ADMIN - GET ALL
    // =========================================

    @GetMapping("/admin")
    public List<GalleryItem> getAllGalleryItems() {

        return repository
                .findAllByOrderByCreatedAtDesc();
    }


    // =========================================
    // ADMIN - ADD GALLERY ITEM
    // =========================================

    @PostMapping("/admin")
    public ResponseEntity<?> addGalleryItem(

            @RequestParam("title")
            String title,

            @RequestParam(value = "description",
                    required = false)
            String description,

            @RequestParam("category")
            String category,

            @RequestParam("mediaType")
            String mediaType,

            @RequestParam(value = "file",
                    required = false)
            MultipartFile file) {

        try {

            // ---------------------------------
            // Validate file
            // ---------------------------------

            if (file == null || file.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Please select a file"
                                )
                        );
            }


            // ---------------------------------
            // V1 - Images only
            // ---------------------------------

            if (!mediaType.equalsIgnoreCase("image")) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Only images are supported currently"
                                )
                        );
            }


            // ---------------------------------
            // Upload to Cloudinary
            // ---------------------------------

            String imageUrl =
                    cloudinaryService.uploadImage(file);


            // ---------------------------------
            // Create entity
            // ---------------------------------

            GalleryItem item =
                    new GalleryItem();

            item.setTitle(title);

            item.setDescription(
                    description
            );

            item.setCategory(
                    category
            );

            item.setMediaType(
                    "image"
            );

            // Cloudinary secure URL
            item.setFilePath(
                    imageUrl
            );

            item.setUploadedBy(
                    "admin"
            );

            item.setActive(true);

            item.setCreatedAt(
                    LocalDateTime.now()
            );


            // ---------------------------------
            // Save DB
            // ---------------------------------

            GalleryItem saved =
                    repository.save(item);


            return ResponseEntity.ok(saved);

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "error",
                                    "Failed to upload gallery image"
                            )
                    );
        }
    }


    // =========================================
    // ADMIN - UPDATE
    // =========================================

    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateGalleryItem(

            @PathVariable Long id,

            @RequestParam("title")
            String title,

            @RequestParam(value = "description",
                    required = false)
            String description,

            @RequestParam("category")
            String category,

            @RequestParam("active")
            Boolean active,

            @RequestParam(value = "file",
                    required = false)
            MultipartFile file) {

        try {

            GalleryItem item =
                    repository.findById(id)
                            .orElse(null);


            if (item == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            // ---------------------------------
            // Update text fields
            // ---------------------------------

            item.setTitle(title);

            item.setDescription(
                    description
            );

            item.setCategory(
                    category
            );

            item.setActive(
                    active
            );


            // ---------------------------------
            // Replace image if provided
            // ---------------------------------

            if (file != null
                    && !file.isEmpty()) {

                // Upload new image first
                String newImageUrl =
                        cloudinaryService.uploadImage(file);


                // Delete old Cloudinary image
                if (item.getFilePath() != null
                        && item.getFilePath()
                        .contains("res.cloudinary.com")) {

                    try {

                        cloudinaryService.deleteImage(
                                item.getFilePath()
                        );

                    } catch (Exception e) {

                        e.printStackTrace();
                    }
                }


                // Save new URL
                item.setFilePath(
                        newImageUrl
                );

                item.setMediaType(
                        "image"
                );
            }


            GalleryItem updated =
                    repository.save(item);


            return ResponseEntity.ok(updated);

        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "error",
                                    "Failed to update gallery image"
                            )
                    );
        }
    }


    // =========================================
    // ADMIN - DELETE
    // =========================================

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteGalleryItem(
            @PathVariable Long id) {

        try {

            GalleryItem item =
                    repository.findById(id)
                            .orElse(null);


            if (item == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            // ---------------------------------
            // Delete image from Cloudinary
            // ---------------------------------

            if (item.getFilePath() != null
                    && item.getFilePath()
                    .contains("res.cloudinary.com")) {

                try {

                    cloudinaryService.deleteImage(
                            item.getFilePath()
                    );

                } catch (Exception e) {

                    e.printStackTrace();
                }
            }


            // ---------------------------------
            // Delete database record
            // ---------------------------------

            repository.delete(item);


            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Gallery item deleted successfully"
                    )
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "error",
                                    "Failed to delete gallery item"
                            )
                    );
        }
    }
}