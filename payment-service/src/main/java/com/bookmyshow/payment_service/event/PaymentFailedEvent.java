package com.bookmyshow.payment_service.event;

public record PaymentFailedEvent(
        String eventId,
        Long bookingId,
        Long paymentId,
        String status
) {
}
