package com.bookmyshow.booking_service.service;

import com.bookmyshow.booking_service.client.MovieServiceClient;
import com.bookmyshow.booking_service.dto.BookingResponse;
import com.bookmyshow.booking_service.dto.CreateBookingRequest;
import com.bookmyshow.booking_service.dto.MovieResponse;
import com.bookmyshow.booking_service.entity.Booking;
import com.bookmyshow.booking_service.event.BookingCancelledEvent;
import com.bookmyshow.booking_service.exception.BookingNotFoundException;
import com.bookmyshow.booking_service.exception.MovieNotFoundException;
import com.bookmyshow.booking_service.exception.SeatLockedException;
import com.bookmyshow.booking_service.repository.BookingRespository;
import com.bookmyshow.booking_service.event.BookingCreatedEvent;
import com.bookmyshow.booking_service.kafka.BookingEventProducer;
import java.util.UUID;

import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import lombok.extern.slf4j.Slf4j;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{
    private final BookingRespository bookingRespository;
    private final MovieServiceClient movieServiceClient;
    private final BookingEventProducer bookingEventProducer;
    private final SeatLockService seatLockService;

    @Override
    @Retry(name = "movieService")
    @CircuitBreaker(
            name = "movieService",
            fallbackMethod = "createBookingFallback"
    )
    public BookingResponse createBooking(
            CreateBookingRequest request,
            Long userId
    ){
        log.info("Calling Movie Service at {}", java.time.LocalTime.now());
        log.info("Step 1: Calling movie service");
        MovieResponse movie =
                movieServiceClient.getMovieById(request.getMovieId());

        log.info("Step 2: Movie found {}", movie);
        boolean locked =
                seatLockService.lockSeat(
                        request.getMovieId(),
                        request.getSeatNumber()
                );

        if (!locked) {
            throw new SeatLockedException("Seat already locked");
        }

        log.info("Step 3: Lock result {}", locked);
        Booking booking = Booking.builder()
                .userId(userId)
                .movieId(request.getMovieId())
                .seatNumber(request.getSeatNumber())
                .status("PENDING")
                .build();

        log.info("Step 4: Saving booking");
        Booking savedBooking = bookingRespository.save(booking);

        BookingCreatedEvent event =
                new BookingCreatedEvent(
                        UUID.randomUUID().toString(),
                        savedBooking.getId(),
                        savedBooking.getUserId(),
                        savedBooking.getMovieId(),
                        savedBooking.getSeatNumber()
                );

        log.info("Step 5: Saved booking {}", savedBooking.getId());
        bookingEventProducer.publishBookingCreated(event);

        log.info("Step 6: Event published");
        return mapToResponse(savedBooking);
    }
    @Override
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRespository
                .findById(id)
                .orElseThrow(
                        ()-> new BookingNotFoundException("Booking not found")
                );
        return mapToResponse(booking);
    }

    @Override
    public List<BookingResponse> getBookingsByUserId(Long userId) {
        return bookingRespository
                .findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .userId(booking.getUserId())
                .movieId(booking.getMovieId())
                .seatNumber(booking.getSeatNumber())
                .status(booking.getStatus())
                .build();
    }

    public BookingResponse createBookingFallback(
            CreateBookingRequest request,
            Throwable ex
    ) {
        log.error("Fallback called. Cause: {}", ex.getClass().getSimpleName());

        if (ex instanceof SeatLockedException) {
            throw (SeatLockedException) ex;
        }

        if (ex instanceof MovieNotFoundException) {
            throw (MovieNotFoundException) ex;
        }

        throw new ResponseStatusException(
                HttpStatus.SERVICE_UNAVAILABLE,
                "Movie Service is currently unavailable"
        );
    }

    @Override
    public BookingResponse cancelBooking(Long bookingId) {

        Booking booking = bookingRespository
                .findById(bookingId)
                .orElseThrow(() ->
                        new BookingNotFoundException("Booking not found"));

        if ("CANCELLED".equals(booking.getStatus())) {
            return mapToResponse(booking);
        }

        booking.setStatus("CANCELLED");

        Booking updatedBooking = bookingRespository.save(booking);

        BookingCancelledEvent event =
                new BookingCancelledEvent(
                        UUID.randomUUID().toString(),
                        updatedBooking.getId(),
                        updatedBooking.getUserId(),
                        updatedBooking.getMovieId(),
                        updatedBooking.getSeatNumber()
                );

        bookingEventProducer.publishBookingCancelled(event);
        return mapToResponse(updatedBooking);
    }

    @Override
    public List<BookingResponse> getAllBookings() {

        return bookingRespository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}
