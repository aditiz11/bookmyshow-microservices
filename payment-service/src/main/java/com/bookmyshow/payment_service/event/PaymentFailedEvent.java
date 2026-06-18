package com.bookmyshow.payment_service.event;

public record PaymentFailedEvent(
        Long bookingId,
        Long paymentId,
        String status
) {
}
