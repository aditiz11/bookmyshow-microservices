package com.bookmyshow.booking_service.event;

public record RefundCompletedEvent(

        String eventId,

        Long bookingId

) {
}