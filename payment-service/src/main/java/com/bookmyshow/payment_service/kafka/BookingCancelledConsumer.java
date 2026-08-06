package com.bookmyshow.payment_service.kafka;

import com.bookmyshow.payment_service.entity.Payment;
import com.bookmyshow.payment_service.entity.ProcessedEvent;
import com.bookmyshow.payment_service.event.BookingCancelledEvent;
import com.bookmyshow.payment_service.event.RefundCompletedEvent;
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
public class BookingCancelledConsumer {

    private final PaymentRepository paymentRepository;
    private final RefundEventProducer refundEventProducer;
    private final ProcessedEventRepository processedEventRepository;

    @KafkaListener(
            topics = "booking-cancelled",
            groupId = "payment-group",
            containerFactory = "bookingCancelledKafkaListenerContainerFactory"
    )
    public void consume(BookingCancelledEvent event) {

        if (processedEventRepository.existsByEventId(event.eventId())) {
            log.info("Duplicate booking-cancelled ignored {}", event.eventId());
            return;
        }

        log.info("================================");
        log.info("BOOKING CANCELLED RECEIVED");
        log.info("Booking Id = {}", event.bookingId());
        log.info("================================");

        Payment payment = paymentRepository
                .findByBookingId(event.bookingId())
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));

        if ("REFUNDED".equals(payment.getStatus())) {
            log.warn("Payment already refunded for booking {}", payment.getBookingId());

            processedEventRepository.save(
                    ProcessedEvent.builder()
                            .eventId(event.eventId())
                            .build()
            );
            return;
        }

        payment.setStatus("REFUNDED");
        paymentRepository.save(payment);

        RefundCompletedEvent refundEvent =
                new RefundCompletedEvent(
                        UUID.randomUUID().toString(),
                        payment.getBookingId()
                );

        refundEventProducer.publishRefundCompleted(refundEvent);

        processedEventRepository.save(
                ProcessedEvent.builder()
                        .eventId(event.eventId())
                        .build()
        );

        log.info("Refund completed for booking {}", payment.getBookingId());
    }
}