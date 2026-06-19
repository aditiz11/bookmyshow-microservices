package com.bookmyshow.payment_service.event;

public record PaymentCompletedEvent(
        String eventId,
        Long bookingId,
        Long paymentId,
        String status
) {
}
