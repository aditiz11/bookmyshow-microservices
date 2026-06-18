package com.bookmyshow.payment_service.event;

public record PaymentCompletedEvent(
        Long bookingId,
        Long paymentId,
        String status
) {
}
