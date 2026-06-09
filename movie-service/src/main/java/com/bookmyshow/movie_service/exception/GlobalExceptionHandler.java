package com.bookmyshow.movie_service.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MovieNotFoundException.class)

    public ResponseEntity<?> handleMovieNotFound(MovieNotFoundException ex) {

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