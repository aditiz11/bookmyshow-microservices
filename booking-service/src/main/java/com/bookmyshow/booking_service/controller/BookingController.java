package com.bookmyshow.booking_service.controller;

import com.bookmyshow.booking_service.dto.BookingResponse;
import com.bookmyshow.booking_service.dto.CreateBookingRequest;
import com.bookmyshow.booking_service.service.BookingService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(@Valid @RequestBody CreateBookingRequest request){
        return bookingService.createBooking(request);
    }

    @GetMapping("/{id}")
    public BookingResponse getBookingById(@PathVariable Long id){
        return bookingService.getBookingById(id);
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponse> getBookingsByUserId(@PathVariable Long userId){
        return bookingService.getBookingsByUserId(userId);
    }
}
