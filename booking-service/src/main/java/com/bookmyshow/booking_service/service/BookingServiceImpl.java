package com.bookmyshow.booking_service.service;

import com.bookmyshow.booking_service.client.MovieServiceClient;
import com.bookmyshow.booking_service.dto.BookingResponse;
import com.bookmyshow.booking_service.dto.CreateBookingRequest;
import com.bookmyshow.booking_service.dto.MovieResponse;
import com.bookmyshow.booking_service.entity.Booking;
import com.bookmyshow.booking_service.exception.BookingNotFoundException;
import com.bookmyshow.booking_service.exception.MovieNotFoundException;
import com.bookmyshow.booking_service.repository.BookingRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{
    private final BookingRespository bookingRespository;
    private final MovieServiceClient movieServiceClient;
    @Override
    public BookingResponse createBooking(CreateBookingRequest request) {
        try{
            MovieResponse movie = movieServiceClient.getMovieById(request.getMovieId());
        }catch (Exception e){
            throw new MovieNotFoundException("Movie not found");
        }

        Booking booking = Booking.builder()
                .userId(request.getUserId())
                .movieId(request.getMovieId())
                .seatNumber(request.getSeatNumber())
                .status("PENDING")
                .build();
        Booking savedBooking = bookingRespository.save(booking);
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
}
