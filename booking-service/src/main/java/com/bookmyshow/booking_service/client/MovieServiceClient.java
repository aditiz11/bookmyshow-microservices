package com.bookmyshow.booking_service.client;

import com.bookmyshow.booking_service.dto.MovieResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class MovieServiceClient {

    private final RestClient restClient;

    @Value("${movie.service.url}")
    private String movieServiceUrl;

    public MovieResponse getMovieById(Long movieId){
        return restClient
                .get()
                .uri(
                        movieServiceUrl + "/api/movies/{id}",
                        movieId
                )
                .retrieve()
                .body(MovieResponse.class);
    }
}
