package com.bookmyshow.booking_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class SeatLockServiceimpl implements SeatLockService {

    private final StringRedisTemplate redisTemplate;

    @Override
    public boolean lockSeat(Long movieId, String seatNumber) {
        String key = "seat:"  + movieId + ":" + seatNumber;
        Boolean success = redisTemplate
                .opsForValue()
                .setIfAbsent(
                        key,
                        "LOCKED",
                        Duration.ofMinutes(5)
                );
        return Boolean.TRUE.equals(success);
    }

}
