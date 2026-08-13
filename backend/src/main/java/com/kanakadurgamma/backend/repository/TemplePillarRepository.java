package com.kanakadurgamma.backend.repository;

import com.kanakadurgamma.backend.entity.TemplePillar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TemplePillarRepository
        extends JpaRepository<TemplePillar, Long> {

    // =========================================
    // PUBLIC - ACTIVE PILLARS
    // =========================================

    List<TemplePillar>
    findByActiveTrueOrderByDisplayOrderAsc();


    // =========================================
    // ADMIN - ALL PILLARS
    // =========================================

    List<TemplePillar>
    findAllByOrderByDisplayOrderAsc();

}