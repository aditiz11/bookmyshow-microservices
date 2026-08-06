package com.bookmyshow.booking_service.kafka;

import com.bookmyshow.booking_service.entity.Booking;
import com.bookmyshow.booking_service.event.RefundCompletedEvent;
import com.bookmyshow.booking_service.repository.BookingRespository;
import com.bookmyshow.booking_service.service.SeatLockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RefundCompletedConsumer {

    private final BookingRespository bookingRespository;
    private final SeatLockService seatLockService;

    @KafkaListener(
            topics = "refund-completed",
            groupId = "booking-group",
            containerFactory = "refundKafkaListenerContainerFactory"
    )
    public void consume(RefundCompletedEvent event) {

        Booking booking = bookingRespository
                .findById(event.bookingId())
                .orElseThrow();

        seatLockService.unlockSeat(
                booking.getMovieId(),
                booking.getSeatNumber()
        );

        log.info(
                "Seat {} unlocked for booking {}",
                booking.getSeatNumber(),
                booking.getId()
        );
    }
}