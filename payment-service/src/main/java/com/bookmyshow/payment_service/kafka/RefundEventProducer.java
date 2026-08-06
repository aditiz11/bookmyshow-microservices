package com.bookmyshow.payment_service.kafka;

import com.bookmyshow.payment_service.event.RefundCompletedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RefundEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishRefundCompleted(
            RefundCompletedEvent event
    ) {

        kafkaTemplate.send(
                "refund-completed",
                event
        );

        log.info(
                "Published RefundCompletedEvent for booking {}",
                event.bookingId()
        );
    }
}