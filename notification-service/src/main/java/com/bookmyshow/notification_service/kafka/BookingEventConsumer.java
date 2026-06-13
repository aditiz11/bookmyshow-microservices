package com.bookmyshow.notification_service.kafka;

import com.bookmyshow.notification_service.event.BookingCreatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BookingEventConsumer {

    @KafkaListener(
            topics = "booking-created",
            groupId = "notification-group"
    )
    public void consume(BookingCreatedEvent event) {

        log.info("=================================");
        log.info("BOOKING RECEIVED");
        log.info("Booking Id : {}", event.bookingId());
        log.info("User Id    : {}", event.userId());
        log.info("Movie Id   : {}", event.movieId());
        log.info("Seat       : {}", event.seatNumber());
        log.info("=================================");
    }
}