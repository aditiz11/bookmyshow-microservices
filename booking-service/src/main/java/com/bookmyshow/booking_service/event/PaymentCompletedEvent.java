package com.bookmyshow.booking_service.event;

public record PaymentCompletedEvent(
        String eventId,
        Long bookingId,
        Long paymentId,
        String status
) {
}