package com.bookmyshow.booking_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value={BookingNotFoundException.class})
    public ResponseEntity<?> handleBookingNotFound(BookingNotFoundException ex){
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        Map.of(
                                "timestamp",
                                LocalDateTime.now(),
                                "message",
                                ex.getMessage(),
                                "status",
                                404
                        )
                );
    }

    @ExceptionHandler(MovieNotFoundException.class)
    public ResponseEntity<?> handleMovieNotFound(MovieNotFoundException ex){
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(
                        Map.of(
                                "timestamp",
                                LocalDateTime.now(),

                                "message",
                                ex.getMessage(),

                                "status",
                                404
                        )
                );
    }
}
