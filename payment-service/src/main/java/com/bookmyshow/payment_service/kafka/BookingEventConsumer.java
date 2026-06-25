package com.bookmyshow.payment_service.kafka;

import com.bookmyshow.payment_service.entity.Payment;
import com.bookmyshow.payment_service.entity.ProcessedEvent;
import com.bookmyshow.payment_service.event.BookingCreatedEvent;
import com.bookmyshow.payment_service.event.PaymentCompletedEvent;
import com.bookmyshow.payment_service.event.PaymentFailedEvent;
import com.bookmyshow.payment_service.repository.PaymentRepository;
import com.bookmyshow.payment_service.repository.ProcessedEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingEventConsumer {

    private final PaymentRepository paymentRepository;
    private final PaymentEventProducer paymentEventProducer;
    private final ProcessedEventRepository processedEventRepository;

    @KafkaListener(
            topics = "booking-created",
            groupId = "payment-group"
    )
    public void consume(BookingCreatedEvent event) {
        if (processedEventRepository.existsByEventId(event.eventId())) {

            log.info("Duplicate booking-created ignored {}", event.eventId());
            return;
        }
        log.info("================================");
        log.info("PAYMENT EVENT RECEIVED");
        log.info("Booking Id = {}", event.bookingId());
        log.info("================================");

        Payment existingPayment = paymentRepository
                        .findByBookingId(event.bookingId())
                        .orElse(null);

        if(existingPayment != null) {

            log.warn("Duplicate booking-created received for booking {}", event.bookingId());
            return;
        }

        Payment payment =
                Payment.builder()
                        .bookingId(event.bookingId())
                        .amount(250.0)
                        .status("PENDING")
                        .build();

        Payment savedPayment = paymentRepository.save(payment);

        // SAGA RULE (YOUR OPTION A)
        boolean isSuccess = event.bookingId() % 2 == 0;

        if (isSuccess) {

            // SUCCESS PATH
            savedPayment.setStatus("COMPLETED");
            savedPayment = paymentRepository.save(savedPayment);

            PaymentCompletedEvent successEvent =
                    new PaymentCompletedEvent(
                            UUID.randomUUID().toString(),
                            savedPayment.getBookingId(),
                            savedPayment.getId(),
                            savedPayment.getStatus()
                    );

            paymentEventProducer.publishPaymentCompleted(successEvent);

            log.info("PAYMENT SUCCESS for booking {}", savedPayment.getBookingId());

        } else {

            // FAILURE PATH
            savedPayment.setStatus("FAILED");
            savedPayment = paymentRepository.save(savedPayment);

            PaymentFailedEvent failedEvent =
                    new PaymentFailedEvent(
                            UUID.randomUUID().toString(),
                            savedPayment.getBookingId(),
                            savedPayment.getId(),
                            savedPayment.getStatus()
                    );

            paymentEventProducer.publishPaymentFailed(failedEvent);

            log.info("PAYMENT FAILED for booking {}", savedPayment.getBookingId());
        }
        processedEventRepository.save(
                ProcessedEvent.builder()
                        .eventId(event.eventId())
                        .build()
        );
    }
}