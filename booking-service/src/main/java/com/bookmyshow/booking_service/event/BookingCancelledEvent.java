package com.bookmyshow.booking_service.event;

public record BookingCancelledEvent(

        String eventId,

        Long bookingId,

        Long userId,

        Long movieId,

        String seatNumber

) {
}