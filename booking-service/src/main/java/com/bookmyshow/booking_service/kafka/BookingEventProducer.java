package com.bookmyshow.booking_service.kafka;


import com.bookmyshow.booking_service.event.BookingCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingEventProducer {

    private final KafkaTemplate<String, BookingCreatedEvent> kafkaTemplate;

    public void publishBookingCreated(BookingCreatedEvent event){
        kafkaTemplate.send("booking-created", event);
    }
}
