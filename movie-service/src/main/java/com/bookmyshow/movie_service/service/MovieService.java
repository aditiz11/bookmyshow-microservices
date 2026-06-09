package com.bookmyshow.movie_service.service;

import com.bookmyshow.movie_service.dto.CreateMovieRequest;
import com.bookmyshow.movie_service.dto.MovieResponse;

import java.util.List;

public interface MovieService {

    MovieResponse createMovie(CreateMovieRequest request);

    List<MovieResponse> getAllMovies();

    MovieResponse getMovieById(Long id);
}
