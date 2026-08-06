package com.bookmyshow.payment_service.controller;

import com.bookmyshow.payment_service.entity.Payment;
import com.bookmyshow.payment_service.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepository paymentRepository;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/booking/{bookingId}")
    public Payment getPaymentByBookingId(
            @PathVariable Long bookingId
    ) {

        return paymentRepository
                .findByBookingId(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));
    }
}