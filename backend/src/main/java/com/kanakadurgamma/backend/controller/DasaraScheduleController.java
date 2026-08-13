package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.DasaraSchedule;
import com.kanakadurgamma.backend.repository.DasaraScheduleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dasara-schedule")
@CrossOrigin(origins = "http://localhost:5173")
public class DasaraScheduleController {

    private final DasaraScheduleRepository repository;


    public DasaraScheduleController(
            DasaraScheduleRepository repository) {

        this.repository = repository;
    }


    // =========================================
    // PUBLIC - ACTIVE SCHEDULE
    // =========================================

    @GetMapping
    public List<DasaraSchedule> getActiveSchedule() {

        return repository
                .findByActiveTrueOrderByDateAscStartTimeAsc();
    }


    // =========================================
    // ADMIN - ALL SCHEDULE
    // =========================================

    @GetMapping("/admin")
    public List<DasaraSchedule> getAllSchedule() {

        return repository
                .findAllByOrderByDateAscStartTimeAsc();
    }


    // =========================================
    // PUBLIC - SCHEDULE BY DATE
    // =========================================

    @GetMapping("/date/{date}")
    public List<DasaraSchedule> getScheduleByDate(
            @PathVariable LocalDate date) {

        return repository
                .findByDateOrderByStartTimeAsc(date);
    }


    // =========================================
    // ADMIN - CREATE SCHEDULE
    // =========================================

    @PostMapping
    public ResponseEntity<DasaraSchedule> createSchedule(
            @RequestBody DasaraSchedule schedule) {

        DasaraSchedule savedSchedule =
                repository.save(schedule);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedSchedule);
    }


    // =========================================
    // ADMIN - UPDATE SCHEDULE
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<DasaraSchedule> updateSchedule(
            @PathVariable Long id,
            @RequestBody DasaraSchedule schedule) {

        return repository
                .findById(id)
                .map(existingSchedule -> {

                    existingSchedule.setTitle(
                            schedule.getTitle()
                    );

                    existingSchedule.setDescription(
                            schedule.getDescription()
                    );

                    existingSchedule.setCategory(
                            schedule.getCategory()
                    );

                    existingSchedule.setDate(
                            schedule.getDate()
                    );

                    existingSchedule.setStartTime(
                            schedule.getStartTime()
                    );

                    existingSchedule.setEndTime(
                            schedule.getEndTime()
                    );

                    existingSchedule.setActive(
                            schedule.getActive()
                    );

                    DasaraSchedule savedSchedule =
                            repository.save(
                                    existingSchedule
                            );

                    return ResponseEntity.ok(
                            savedSchedule
                    );

                })
                .orElseGet(() ->
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }


    // =========================================
    // ADMIN - DELETE SCHEDULE
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(
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