package com.bookmyshow.movie_service.controller;

import com.bookmyshow.movie_service.dto.CreateMovieRequest;
import com.bookmyshow.movie_service.dto.MovieResponse;
import com.bookmyshow.movie_service.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public MovieResponse createMovie(
            @Valid @RequestBody CreateMovieRequest request) {

        return movieService.createMovie(request);
    }

    @GetMapping
    public List<MovieResponse> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public MovieResponse getMovieById(
            @PathVariable Long id) {

        return movieService.getMovieById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public MovieResponse updateMovie(
            @PathVariable Long id,
            @Valid @RequestBody CreateMovieRequest request) {

        return movieService.updateMovie(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteMovie(
            @PathVariable Long id) {

        movieService.deleteMovie(id);
    }
}