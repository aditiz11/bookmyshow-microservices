package com.bookmyshow.booking_service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class SeatLockServiceImpl implements SeatLockService {

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

    @Override
    public boolean unlockSeat(Long movieId, String seatNumber) {

        String key = "seat:" + movieId + ":" + seatNumber;

        Boolean exists = redisTemplate.hasKey(key);

        if (Boolean.FALSE.equals(exists)) {
            return true;
        }
        log.info("Unlocking seat for movieId={}, seatNumber={}", movieId, seatNumber);

        Boolean deleted = redisTemplate.delete(key);
        log.info("Seat unlock result: {}", deleted);
        return Boolean.TRUE.equals(deleted);

    }

}
