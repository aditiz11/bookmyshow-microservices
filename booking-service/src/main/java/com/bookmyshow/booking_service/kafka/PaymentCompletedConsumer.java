package com.bookmyshow.booking_service.kafka;

import com.bookmyshow.booking_service.entity.Booking;
import com.bookmyshow.booking_service.entity.ProcessedEvent;
import com.bookmyshow.booking_service.event.PaymentCompletedEvent;
import com.bookmyshow.booking_service.repository.BookingRespository;
import com.bookmyshow.booking_service.repository.ProcessedEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentCompletedConsumer {

    private final BookingRespository bookingRespository;
    private final ProcessedEventRepository processedEventRepository;

    @KafkaListener(
            topics = "payment-success",
            groupId = "booking-group",
            containerFactory =
                    "paymentKafkaListenerContainerFactory"
    )
    public void consume(PaymentCompletedEvent event) {

        if (processedEventRepository.existsByEventId(event.eventId())) {

            log.info("Duplicate event ignored {}", event.eventId());
            return;
        }
        Booking booking = bookingRespository
                        .findById(event.bookingId())
                        .orElseThrow();

        if("CONFIRMED".equals(booking.getStatus())) {
            log.warn("Booking {} already confirmed", booking.getId());
            return;
        }

        booking.setStatus("CONFIRMED");

        bookingRespository.save(booking);

        log.info(
                "Booking {} confirmed",
                booking.getId()
        );

        ProcessedEvent processedEvent = ProcessedEvent.builder()
                .eventId(event.eventId())
                .build();

        processedEventRepository.save(processedEvent);

    }
}
