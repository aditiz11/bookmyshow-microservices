package com.bookmyshow.payment_service.repository;

import com.bookmyshow.payment_service.entity.ProcessedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedEventRepository
        extends JpaRepository<ProcessedEvent, Long> {

    boolean existsByEventId(String eventId);
}