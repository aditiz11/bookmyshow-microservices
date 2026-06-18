package com.bookmyshow.booking_service.kafka;

import com.bookmyshow.booking_service.entity.Booking;
import com.bookmyshow.booking_service.event.PaymentCompletedEvent;
import com.bookmyshow.booking_service.repository.BookingRespository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentCompletedConsumer {

    private final BookingRespository bookingRespository;

    @KafkaListener(
            topics = "payment-success",
            groupId = "booking-group",
            containerFactory =
                    "paymentKafkaListenerContainerFactory"
    )
    public void consume(
            PaymentCompletedEvent event
    ) {

        Booking booking = bookingRespository
                        .findById(event.bookingId())
                        .orElseThrow();

        booking.setStatus("CONFIRMED");

        bookingRespository.save(booking);

        log.info(
                "Booking {} confirmed",
                booking.getId()
        );
    }
}
