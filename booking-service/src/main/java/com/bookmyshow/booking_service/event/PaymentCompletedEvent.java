package com.bookmyshow.booking_service.event;

public record PaymentCompletedEvent(
        Long bookingId,
        Long paymentId,
        String status
) {
}