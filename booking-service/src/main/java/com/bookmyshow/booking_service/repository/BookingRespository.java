package com.bookmyshow.booking_service.repository;

import com.bookmyshow.booking_service.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRespository extends JpaRepository<Booking, Long > {
    List<Booking> findByUserId(Long userId);
}
