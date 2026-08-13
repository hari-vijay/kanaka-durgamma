package com.kanakadurgamma.backend.repository;

import com.kanakadurgamma.backend.entity.TempleInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempleInfoRepository
        extends JpaRepository<TempleInfo, Long> {
}