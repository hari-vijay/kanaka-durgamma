package com.kanakadurgamma.backend.repository;

import com.kanakadurgamma.backend.entity.TempleUpdate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TempleUpdateRepository
        extends JpaRepository<TempleUpdate, Long> {

    List<TempleUpdate>
    findByActiveTrueOrderByCreatedAtDesc();

    List<TempleUpdate>
    findAllByOrderByCreatedAtDesc();
}