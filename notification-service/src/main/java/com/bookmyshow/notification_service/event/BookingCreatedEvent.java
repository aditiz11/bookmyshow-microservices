package com.bookmyshow.notification_service.event;

public record BookingCreatedEvent(
        Long bookingId,
        Long userId,
        Long movieId,
        String seatNumber
) {
}
