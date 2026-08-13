package com.kanakadurgamma.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile file) throws IOException {

        Map<?, ?> result = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "image",
                        "folder", "kanaka-durgamma"
                )
        );

        return result.get("secure_url").toString();
    }

    public void deleteImage(String imageUrl) throws IOException {

        if (imageUrl == null || imageUrl.isBlank()) {
            return;
        }

        String publicId = extractPublicId(imageUrl);

        cloudinary.uploader().destroy(
                publicId,
                ObjectUtils.asMap(
                        "resource_type", "image"
                )
        );
    }

    private String extractPublicId(String imageUrl) {

        String uploadMarker = "/upload/";

        int uploadIndex = imageUrl.indexOf(uploadMarker);

        if (uploadIndex == -1) {
            throw new IllegalArgumentException(
                    "Invalid Cloudinary image URL"
            );
        }

        String publicId = imageUrl.substring(
                uploadIndex + uploadMarker.length()
        );

        // Remove version part: v123456789/
        if (publicId.startsWith("v")) {
            int slashIndex = publicId.indexOf("/");

            if (slashIndex != -1) {
                publicId = publicId.substring(
                        slashIndex + 1
                );
            }
        }

        // Remove file extension
        int extensionIndex = publicId.lastIndexOf(".");

        if (extensionIndex != -1) {
            publicId = publicId.substring(
                    0,
                    extensionIndex
            );
        }

        return publicId;
    }
}