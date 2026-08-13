package com.kanakadurgamma.backend.repository;

import com.kanakadurgamma.backend.entity.DasaraSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DasaraScheduleRepository
        extends JpaRepository<DasaraSchedule, Long> {

    List<DasaraSchedule>
    findByActiveTrueOrderByDateAscStartTimeAsc();

    List<DasaraSchedule>
    findAllByOrderByDateAscStartTimeAsc();

    List<DasaraSchedule>
    findByDateOrderByStartTimeAsc(LocalDate date);
}