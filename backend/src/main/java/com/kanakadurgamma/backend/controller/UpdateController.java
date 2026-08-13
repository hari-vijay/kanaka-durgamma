package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.TempleUpdate;
import com.kanakadurgamma.backend.repository.TempleUpdateRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/updates")
@CrossOrigin(origins = "http://localhost:5173")
public class UpdateController {

    private final TempleUpdateRepository repository;

    public UpdateController(
            TempleUpdateRepository repository) {

        this.repository = repository;
    }


    // =========================================
    // PUBLIC UPDATES
    // =========================================

    @GetMapping
    public List<TempleUpdate> getActiveUpdates() {

        return repository
                .findByActiveTrueOrderByCreatedAtDesc();
    }


    // =========================================
    // ADMIN - ALL UPDATES
    // =========================================

    @GetMapping("/admin")
    public List<TempleUpdate> getAllUpdates() {

        return repository
                .findAllByOrderByCreatedAtDesc();
    }


    // =========================================
    // ADMIN - CREATE UPDATE
    // =========================================

    @PostMapping
    public ResponseEntity<TempleUpdate> createUpdate(
            @RequestBody TempleUpdate update) {

        TempleUpdate savedUpdate =
                repository.save(update);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUpdate);
    }


    // =========================================
    // ADMIN - UPDATE
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<TempleUpdate> updateUpdate(
            @PathVariable Long id,
            @RequestBody TempleUpdate update) {

        return repository
                .findById(id)
                .map(existingUpdate -> {

                    existingUpdate.setTitle(
                            update.getTitle()
                    );

                    existingUpdate.setDescription(
                            update.getDescription()
                    );

                    existingUpdate.setCategory(
                            update.getCategory()
                    );

                    existingUpdate.setActive(
                            update.getActive()
                    );

                    TempleUpdate savedUpdate =
                            repository.save(
                                    existingUpdate
                            );

                    return ResponseEntity.ok(
                            savedUpdate
                    );

                })
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }


    // =========================================
    // ADMIN - DELETE
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUpdate(
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
}