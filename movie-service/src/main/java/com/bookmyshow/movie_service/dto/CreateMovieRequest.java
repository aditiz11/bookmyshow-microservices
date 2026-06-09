package com.bookmyshow.movie_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateMovieRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String genre;

    @NotNull
    private Integer duration;

    @NotBlank
    private String language;

    @NotBlank
    private String description;
}
