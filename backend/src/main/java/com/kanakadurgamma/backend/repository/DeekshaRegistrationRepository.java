package com.kanakadurgamma.backend.repository;

import com.kanakadurgamma.backend.entity.DeekshaRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeekshaRegistrationRepository
        extends JpaRepository<DeekshaRegistration, Long> {

    long countByStatus(String status);
}