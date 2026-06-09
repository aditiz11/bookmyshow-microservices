package com.bookmyshow.user_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {

    private Long id;

    private String name;

    private String email;
}