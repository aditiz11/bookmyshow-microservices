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
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    @Override
    public MovieResponse createMovie(CreateMovieRequest request) {

        Movie movie = Movie.builder()
                .title(request.getTitle())
                .genre(request.getGenre())
                .duration(request.getDuration())
                .language(request.getLanguage())
                .description(request.getDescription())
                .posterUrl(request.getPosterUrl())
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
                .orElseThrow(() ->
                        new MovieNotFoundException("Movie not found"));

        return mapToResponse(movie);
    }

    @Override
    public MovieResponse updateMovie(
            Long id,
            CreateMovieRequest request) {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() ->
                        new MovieNotFoundException("Movie not found"));

        movie.setTitle(request.getTitle());
        movie.setGenre(request.getGenre());
        movie.setDuration(request.getDuration());
        movie.setLanguage(request.getLanguage());
        movie.setDescription(request.getDescription());
        movie.setPosterUrl(request.getPosterUrl());

        Movie updatedMovie = movieRepository.save(movie);

        return mapToResponse(updatedMovie);
    }

    @Override
    public void deleteMovie(Long id) {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() ->
                        new MovieNotFoundException("Movie not found"));

        movieRepository.delete(movie);
    }

    private MovieResponse mapToResponse(Movie movie) {

        return MovieResponse.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .genre(movie.getGenre())
                .duration(movie.getDuration())
                .language(movie.getLanguage())
                .description(movie.getDescription())
                .posterUrl(movie.getPosterUrl())
                .build();
    }
}