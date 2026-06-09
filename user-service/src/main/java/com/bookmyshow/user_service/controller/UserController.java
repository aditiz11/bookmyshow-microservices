package com.bookmyshow.user_service.controller;

import com.bookmyshow.user_service.dto.*;
import com.bookmyshow.user_service.entity.User;
import com.bookmyshow.user_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController  {

    private final UserService userService;
    @PostMapping("/register")
    public RegisterResponse registerUser(@Valid @RequestBody RegisterRequest request){
        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request){
        return userService.login(request);
    }

    @GetMapping("/profile")
    public ProfileResponse profile(
            Authentication authentication) {

        String email =
                authentication.getName();

        return userService.getProfile(email);
    }
}
