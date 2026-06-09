package com.bookmyshow.booking_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookingResponse {

    private Long id;

    private Long userId;

    private Long movieId;

    private String seatNumber;

    private String status;
}
