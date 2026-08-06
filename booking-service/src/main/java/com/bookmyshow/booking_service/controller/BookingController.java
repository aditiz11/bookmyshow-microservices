package com.bookmyshow.booking_service.controller;

import com.bookmyshow.booking_service.dto.BookingResponse;
import com.bookmyshow.booking_service.dto.CreateBookingRequest;
import com.bookmyshow.booking_service.security.UserPrincipal;
import com.bookmyshow.booking_service.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(
            @Valid @RequestBody CreateBookingRequest request,
            Authentication authentication
    ) {

        UserPrincipal user =
                (UserPrincipal) authentication.getPrincipal();

        return bookingService.createBooking(
                request,
                user.getId()
        );
    }

    @GetMapping("/my")
    public List<BookingResponse> getMyBookings(Authentication authentication) {

        UserPrincipal user =
                (UserPrincipal) authentication.getPrincipal();

        return bookingService.getBookingsByUserId(user.getId());
    }


    @GetMapping
    public List<BookingResponse> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public BookingResponse getBookingById(@PathVariable Long id){
        return bookingService.getBookingById(id);
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponse> getBookingsByUserId(@PathVariable Long userId){
        return bookingService.getBookingsByUserId(userId);
    }

    @PutMapping("/{id}/cancel")
    public BookingResponse cancelBooking(
            @PathVariable Long id
    ) {
        return bookingService.cancelBooking(id);
    }
}
