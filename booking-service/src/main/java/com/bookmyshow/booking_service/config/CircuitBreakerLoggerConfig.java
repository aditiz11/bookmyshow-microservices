package com.bookmyshow.booking_service.config;

import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class CircuitBreakerLoggerConfig {

    private final CircuitBreakerRegistry registry;

    @PostConstruct
    public void init() {

        registry.circuitBreaker("movieService")
                .getEventPublisher()
                .onStateTransition(event ->
                        log.info("CircuitBreaker state changed: {} -> {}",
                                event.getStateTransition().getFromState(),
                                event.getStateTransition().getToState()))
                .onError(event ->
                        log.info("CircuitBreaker recorded failure"));
    }
}