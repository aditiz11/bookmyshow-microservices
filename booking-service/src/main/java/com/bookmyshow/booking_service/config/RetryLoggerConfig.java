package com.bookmyshow.booking_service.config;

import io.github.resilience4j.retry.RetryRegistry;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class RetryLoggerConfig {

    private final RetryRegistry retryRegistry;

    @PostConstruct
    public void init() {

        retryRegistry.retry("movieService")
                .getEventPublisher()
                .onRetry(event ->
                        log.info("Retry attempt #{}", event.getNumberOfRetryAttempts())
                );
    }
}