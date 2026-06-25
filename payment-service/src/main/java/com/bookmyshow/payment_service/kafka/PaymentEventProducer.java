package com.bookmyshow.payment_service.kafka;

import com.bookmyshow.payment_service.event.PaymentCompletedEvent;
import com.bookmyshow.payment_service.event.PaymentFailedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishPaymentCompleted(PaymentCompletedEvent event) {
        kafkaTemplate.send("payment-success", event);
    }

    public void publishPaymentFailed(PaymentFailedEvent event) {
        kafkaTemplate.send("payment-failed", event);
    }


}
