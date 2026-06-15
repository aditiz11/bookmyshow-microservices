package com.bookmyshow.payment_service.kafka;

import com.bookmyshow.payment_service.entity.Payment;
import com.bookmyshow.payment_service.event.BookingCreatedEvent;
import com.bookmyshow.payment_service.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingEventConsumer {
    private final PaymentRepository paymentRepository;

    @KafkaListener(
            topics = "booking-created",
            groupId = "payment-group"
    )
    public void consume(
            BookingCreatedEvent event
    ) {

        Payment payment =
                Payment.builder()
                        .bookingId(event.bookingId())
                        .amount(250.0)
                        .status("PENDING")
                        .build();

        paymentRepository.save(payment);

        log.info(
                "Payment Created For Booking {}",
                event.bookingId()
        );
    }
}
