package com.bookmyshow.notification_service.config;

import com.bookmyshow.notification_service.event.BookingCreatedEvent;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConsumerConfig {

    private final KafkaProperties kafkaProperties;

    public KafkaConsumerConfig(KafkaProperties kafkaProperties) {
        this.kafkaProperties = kafkaProperties;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, BookingCreatedEvent>
    kafkaListenerContainerFactory() {

        Map<String, Object> props = new HashMap<>();

        props.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                kafkaProperties.getBootstrapServers().get(0)
        );

        props.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "notification-group"
        );

        JsonDeserializer<BookingCreatedEvent> deserializer =
                new JsonDeserializer<>(BookingCreatedEvent.class);

        deserializer.addTrustedPackages("*");

        // VERY IMPORTANT
        deserializer.setUseTypeHeaders(false);

        DefaultKafkaConsumerFactory<String, BookingCreatedEvent>
                consumerFactory =
                new DefaultKafkaConsumerFactory<>(
                        props,
                        new StringDeserializer(),
                        deserializer
                );

        ConcurrentKafkaListenerContainerFactory<String, BookingCreatedEvent>
                factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(consumerFactory);

        return factory;
    }
}