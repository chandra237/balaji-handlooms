package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.dto.LoginRequestDTO;
import com.balajihandlooms.sample.dto.RegisterRequestDTO;
import com.balajihandlooms.sample.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequestDTO request){
        authService.register(request);

        return "User Registered successfully";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequestDTO request){
        String token = authService.login(request);

        return Map.of("token", token);
    }
}
