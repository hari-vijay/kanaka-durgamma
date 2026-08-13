package com.kanakadurgamma.backend.repository;

import com.kanakadurgamma.backend.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    Donation findByRazorpayOrderId(String razorpayOrderId);

    List<Donation> findAllByOrderByCreatedAtDesc();

    List<Donation> findByPaymentStatusOrderByCreatedAtDesc(String paymentStatus);

    long countByPaymentStatus(String paymentStatus);
}