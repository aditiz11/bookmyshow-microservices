package com.bookmyshow.booking_service.service;

import com.bookmyshow.booking_service.dto.BookingResponse;
import com.bookmyshow.booking_service.dto.CreateBookingRequest;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(CreateBookingRequest request);
    BookingResponse getBookingById(Long id);
    List<BookingResponse> getBookingsByUserId(Long userId);
   
}
