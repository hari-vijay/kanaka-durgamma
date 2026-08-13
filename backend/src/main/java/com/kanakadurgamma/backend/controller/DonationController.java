package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.Donation;
import com.kanakadurgamma.backend.repository.DonationRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:5173")
public class DonationController {

    

    private final RazorpayClient razorpayClient;
    private final DonationRepository repository;

    @Value("${razorpay.key.secret}")
private String razorpayKeySecret;

    public DonationController(
            RazorpayClient razorpayClient,
            DonationRepository repository) {

        this.razorpayClient = razorpayClient;
        this.repository = repository;
    }


    // =========================================
    // CREATE RAZORPAY ORDER
    // =========================================

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestBody Donation donation) {

        try {

            // ---------------------------------
            // Validate donor name
            // ---------------------------------

            if (donation.getDonorName() == null
                    || donation.getDonorName().isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Donor name is required"
                                )
                        );
            }


            // ---------------------------------
            // Validate amount
            // ---------------------------------

            if (donation.getAmount() == null
                    || donation.getAmount() <= 0) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Donation amount must be greater than zero"
                                )
                        );
            }


            // ---------------------------------
            // Convert INR → Paise
            // ---------------------------------

            long amountInPaise =
                    donation.getAmount() * 100;


            // ---------------------------------
            // Create Razorpay Order
            // ---------------------------------

            JSONObject orderRequest =
                    new JSONObject();

            orderRequest.put(
                    "amount",
                    amountInPaise
            );

            orderRequest.put(
                    "currency",
                    "INR"
            );

            orderRequest.put(
                    "receipt",
                    "donation_" + System.currentTimeMillis()
            );


            Order order =
                    razorpayClient.orders.create(
                            orderRequest
                    );


            String razorpayOrderId =
                    order.get("id").toString();


            // ---------------------------------
            // Save pending donation
            // ---------------------------------

            donation.setRazorpayOrderId(
                    razorpayOrderId
            );

            donation.setPaymentStatus(
                    "PENDING"
            );

            donation.setCreatedAt(
                    LocalDateTime.now()
            );


            Donation saved =
                    repository.save(donation);


            // ---------------------------------
            // Return order details
            // ---------------------------------

            return ResponseEntity.ok(
                    Map.of(
                            "donationId",
                            saved.getId(),

                            "orderId",
                            razorpayOrderId,

                            "amount",
                            donation.getAmount(),

                            "currency",
                            "INR"
                    )
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "error",
                                    "Failed to create Razorpay order"
                            )
                    );
        }
    }


    // =========================================
    // VERIFY RAZORPAY PAYMENT
    // =========================================

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(
            @RequestBody Map<String, Object> paymentData) {

        try {

            // ---------------------------------
            // Get frontend response
            // ---------------------------------

            Long donationId =
                    Long.valueOf(
                            paymentData
                                    .get("donationId")
                                    .toString()
                    );

            String paymentId =
                    paymentData
                            .get("razorpayPaymentId")
                            .toString();

            String receivedOrderId =
                    paymentData
                            .get("razorpayOrderId")
                            .toString();

            String signature =
                    paymentData
                            .get("razorpaySignature")
                            .toString();


            // ---------------------------------
            // Find donation from MySQL
            // ---------------------------------

            Donation donation =
                    repository.findById(donationId)
                            .orElseThrow(
                                    () -> new RuntimeException(
                                            "Donation not found"
                                    )
                            );


            // ---------------------------------
            // IMPORTANT:
            // Use order ID stored in OUR DB
            // ---------------------------------

            String databaseOrderId =
                    donation.getRazorpayOrderId();


            if (databaseOrderId == null
                    || databaseOrderId.isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Razorpay order ID not found"
                                )
                        );
            }


            // ---------------------------------
            // Prevent mismatched order
            // ---------------------------------

            if (!databaseOrderId.equals(
                    receivedOrderId)) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "error",
                                        "Order ID mismatch"
                                )
                        );
            }


            // ---------------------------------
            // Prepare signature verification
            // ---------------------------------

            JSONObject options =
                    new JSONObject();

            options.put(
                    "razorpay_order_id",
                    databaseOrderId
            );

            options.put(
                    "razorpay_payment_id",
                    paymentId
            );

            options.put(
                    "razorpay_signature",
                    signature
            );


            // ---------------------------------
            // Verify Razorpay signature
            // ---------------------------------

          


          


           boolean verified =
        Utils.verifyPaymentSignature(
                options,
                razorpayKeySecret
        );


            // ---------------------------------
            // Signature invalid
            // ---------------------------------

            if (!verified) {

                donation.setPaymentStatus(
                        "FAILED"
                );

                repository.save(donation);

                return ResponseEntity
                        .badRequest()
                        .body(
                                Map.of(
                                        "success",
                                        false,
                                        "error",
                                        "Payment signature verification failed"
                                )
                        );
            }


            // ---------------------------------
            // Payment verified successfully
            // ---------------------------------

            donation.setRazorpayPaymentId(
                    paymentId
            );

            donation.setPaymentStatus(
                    "PAID"
            );


            Donation saved =
                    repository.save(donation);


            // ---------------------------------
            // Success response
            // ---------------------------------

            return ResponseEntity.ok(
                    Map.of(
                            "success",
                            true,

                            "message",
                            "Payment verified successfully",

                            "donationId",
                            saved.getId(),

                            "paymentId",
                            paymentId,

                            "orderId",
                            databaseOrderId,

                            "status",
                            "PAID"
                    )
            );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            Map.of(
                                    "success",
                                    false,
                                    "error",
                                    "Failed to verify payment"
                            )
                    );
        }
    }
    // =========================================
// ADMIN - GET ALL DONATIONS
// =========================================

@GetMapping("/admin/all")
public ResponseEntity<?> getAllDonations() {

    try {

        return ResponseEntity.ok(
                repository.findAllByOrderByCreatedAtDesc()
        );

    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity
                .internalServerError()
                .body(
                        Map.of(
                                "error",
                                "Failed to fetch donations"
                        )
                );
    }
}
}