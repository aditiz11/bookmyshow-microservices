package com.bookmyshow.notification_service.kafka;

import com.bookmyshow.notification_service.entity.ProcessedEvent;
import com.bookmyshow.notification_service.event.BookingCreatedEvent;
import com.bookmyshow.notification_service.repository.ProcessedEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookingEventConsumer {

    private final ProcessedEventRepository processedEventRepository;

    @KafkaListener(
            topics = "booking-created",
            groupId = "notification-group"
    )
    public void consume(BookingCreatedEvent event) {

        if (processedEventRepository.existsByEventId(event.eventId())) {

            log.info(
                    "Duplicate notification ignored {}",
                    event.eventId()
            );

            return;
        }
        log.info("=================================");
        log.info("BOOKING RECEIVED");
        log.info("Booking Id : {}", event.bookingId());
        log.info("User Id    : {}", event.userId());
        log.info("Movie Id   : {}", event.movieId());
        log.info("Seat       : {}", event.seatNumber());
        log.info("=================================");

        processedEventRepository.save(
                ProcessedEvent.builder()
                        .eventId(event.eventId())
                        .build()
        );
    }
}