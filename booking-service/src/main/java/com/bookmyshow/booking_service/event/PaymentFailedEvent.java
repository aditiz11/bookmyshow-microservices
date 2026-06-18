package com.bookmyshow.booking_service.event;

public record PaymentFailedEvent(
        Long bookingId,
        Long paymentId,
        String status
) {
}
