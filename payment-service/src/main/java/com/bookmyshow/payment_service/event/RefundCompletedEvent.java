package com.bookmyshow.payment_service.event;

public record RefundCompletedEvent(

        String eventId,

        Long bookingId

) {
}