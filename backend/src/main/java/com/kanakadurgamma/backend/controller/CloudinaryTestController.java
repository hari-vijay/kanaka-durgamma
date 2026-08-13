package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/cloudinary")
public class CloudinaryTestController {

    private final CloudinaryService cloudinaryService;

    public CloudinaryTestController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {

        try {
            String imageUrl = cloudinaryService.uploadImage(file);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Image uploaded successfully",
                            "url", imageUrl
                    )
            );

        } catch (IOException e) {

            return ResponseEntity.internalServerError().body(
                    Map.of(
                            "message", "Image upload failed",
                            "error", e.getMessage()
                    )
            );
        }
    }
}