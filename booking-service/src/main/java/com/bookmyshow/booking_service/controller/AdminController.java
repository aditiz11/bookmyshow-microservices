package com.bookmyshow.booking_service.controller;

import com.bookmyshow.booking_service.repository.BookingRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final BookingRespository bookingRepository;

    @GetMapping("/dashboard")
    public Map<String, Long> dashboard() {

        Map<String, Long> stats = new HashMap<>();

        stats.put(
                "totalBookings",
                bookingRepository.count()
        );

        stats.put(
                "confirmedBookings",
                bookingRepository.countByStatus("CONFIRMED")
        );

        stats.put(
                "cancelledBookings",
                bookingRepository.countByStatus("CANCELLED")
        );

        stats.put(
                "pendingBookings",
                bookingRepository.countByStatus("PENDING")
        );

        return stats;
    }
}