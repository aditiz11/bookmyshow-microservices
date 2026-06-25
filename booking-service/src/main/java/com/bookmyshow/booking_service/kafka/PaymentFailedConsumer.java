package com.bookmyshow.booking_service.kafka;

import com.bookmyshow.booking_service.entity.ProcessedEvent;
import com.bookmyshow.booking_service.event.PaymentFailedEvent;
import com.bookmyshow.booking_service.entity.Booking;
import com.bookmyshow.booking_service.repository.BookingRespository;
import com.bookmyshow.booking_service.repository.ProcessedEventRepository;
import com.bookmyshow.booking_service.service.SeatLockService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentFailedConsumer {

    private final BookingRespository bookingRepository;
    private final SeatLockService seatLockService;
    private final ProcessedEventRepository processedEventRepository;

    @KafkaListener(
            topics = "payment-failed",
            groupId = "booking-group",
            containerFactory = "paymentFailedKafkaListenerContainerFactory"
    )
    public void consume(PaymentFailedEvent event) {
        if (processedEventRepository.existsByEventId(event.eventId())) {

            log.info("Duplicate failure event ignored {}", event.eventId());
            return;
        }
        log.info("PAYMENT FAILED received for booking {}", event.bookingId());

        Booking booking = bookingRepository.findById(event.bookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if("CANCELLED".equals(booking.getStatus())) {

            log.warn("Booking {} already cancelled", booking.getId());
            return;
        }
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);


        log.info("Booking {} marked as CANCELLED", booking.getId());

        // 2. IMPORTANT: unlock seat (COMPENSATION STEP)
        boolean unlocked = seatLockService.unlockSeat(
                booking.getMovieId(),
                booking.getSeatNumber()
        );

        log.info("Seat unlock status for booking {} → {}",
                booking.getId(),
                unlocked
        );

        ProcessedEvent processedEvent = ProcessedEvent.builder()
                .eventId(event.eventId())
                .build();

        processedEventRepository.save(processedEvent);
    }
}