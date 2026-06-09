package com.bookmyshow.user_service.service;

import com.bookmyshow.user_service.dto.*;

public interface UserService {
    RegisterResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    ProfileResponse getProfile(String email);
}
