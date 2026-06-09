package com.bookmyshow.movie_service.service;

import com.bookmyshow.movie_service.dto.CreateMovieRequest;
import com.bookmyshow.movie_service.dto.MovieResponse;
import com.bookmyshow.movie_service.entity.Movie;
import com.bookmyshow.movie_service.exception.MovieNotFoundException;
import com.bookmyshow.movie_service.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService{

    private final MovieRepository movieRepository;

    @Override
    public MovieResponse createMovie(CreateMovieRequest request) {
        Movie movie = Movie.builder()
                .title(request.getTitle())
                .genre(request.getGenre())
                .duration(request.getDuration())
                .language(request.getLanguage())
                .description(request.getDescription())
                .build();
        Movie savedMovie = movieRepository.save(movie);
        return mapToResponse(savedMovie);
    }

    @Override
    public List<MovieResponse> getAllMovies() {
        return movieRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public MovieResponse getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(
                        () -> new MovieNotFoundException("Movie not found")
                );
        return mapToResponse(movie);
    }

    private MovieResponse mapToResponse(Movie movie) {
        return MovieResponse.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .genre(movie.getGenre())
                .duration(movie.getDuration())
                .language(movie.getLanguage())
                .description(movie.getDescription())
                .build();
    }
}
