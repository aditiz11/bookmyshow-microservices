package com.bookmyshow.booking_service.client;

import com.bookmyshow.booking_service.dto.MovieResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class MovieServiceClient {

    private final RestClient restClient;

    public MovieResponse getMovieById(Long movieId){
        return restClient
                .get()
                .uri(
                        "http://localhost:8082/api/movies/{id}",
                        movieId
                )
                .retrieve()
                .body(MovieResponse.class);
    }
}
