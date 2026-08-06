package com.bookmyshow.booking_service.kafka;

import com.bookmyshow.booking_service.event.BookingCancelledEvent;
import com.bookmyshow.booking_service.event.BookingCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishBookingCreated(BookingCreatedEvent event) {
        kafkaTemplate.send("booking-created", event);
    }

    public void publishBookingCancelled(BookingCancelledEvent event) {
        kafkaTemplate.send("booking-cancelled", event);

        log.info(
                "Published BookingCancelledEvent {}",
                event.bookingId()
        );
    }
}