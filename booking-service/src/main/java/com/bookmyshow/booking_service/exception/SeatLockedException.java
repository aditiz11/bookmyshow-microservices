package com.bookmyshow.booking_service.exception;

public class SeatLockedException extends RuntimeException{


    public SeatLockedException(String message){
        super(message);
    }
}
