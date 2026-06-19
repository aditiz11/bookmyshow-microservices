package com.bookmyshow.booking_service.event;

public record PaymentFailedEvent(
        String eventId,
        Long bookingId,
        Long paymentId,
        String status
) {
}
