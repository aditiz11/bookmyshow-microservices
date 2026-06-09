package com.bookmyshow.booking_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateBookingRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Long movieId;

    @NotBlank
    private String seatNumber;
}
