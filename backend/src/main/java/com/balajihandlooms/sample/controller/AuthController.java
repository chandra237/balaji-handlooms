package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.dto.AuthResponseDTO;
import com.balajihandlooms.sample.dto.LoginRequestDTO;
import com.balajihandlooms.sample.dto.RegisterRequestDTO;
import com.balajihandlooms.sample.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequestDTO request){
        authService.register(request);
        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully"
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request){
        AuthResponseDTO authResponseDTO = authService.login(request);

        return ResponseEntity.ok(authResponseDTO);
    }
}
