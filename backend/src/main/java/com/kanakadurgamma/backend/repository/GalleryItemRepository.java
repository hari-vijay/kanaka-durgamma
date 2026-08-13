package com.kanakadurgamma.backend.repository;

import com.kanakadurgamma.backend.entity.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GalleryItemRepository
        extends JpaRepository<GalleryItem, Long> {

    List<GalleryItem>
    findByActiveTrueOrderByCreatedAtDesc();

    List<GalleryItem>
    findAllByOrderByCreatedAtDesc();
}