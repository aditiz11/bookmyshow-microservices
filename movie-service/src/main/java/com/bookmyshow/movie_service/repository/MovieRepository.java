package com.bookmyshow.movie_service.repository;

import com.bookmyshow.movie_service.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {

}
