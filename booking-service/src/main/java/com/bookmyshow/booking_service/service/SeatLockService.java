package com.bookmyshow.booking_service.service;

public interface SeatLockService  {

    boolean lockSeat(Long movieId, String seatNumber);
}
