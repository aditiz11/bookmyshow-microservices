package com.bookmyshow.payment_service.event;

public record BookingCancelledEvent(

        String eventId,

        Long bookingId,

        Long userId,

        Long movieId,

        String seatNumber

) {
}