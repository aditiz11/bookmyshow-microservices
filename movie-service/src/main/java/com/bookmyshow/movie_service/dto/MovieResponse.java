package com.bookmyshow.movie_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MovieResponse {

    private Long id;
    private String title;
    private String genre;
    private Integer duration;
    private String language;
    private String description;
}
