package com.balajihandlooms.sample.service;

import com.balajihandlooms.sample.dto.AuthResponseDTO;
import com.balajihandlooms.sample.dto.LoginRequestDTO;
import com.balajihandlooms.sample.dto.RegisterRequestDTO;
import com.balajihandlooms.sample.entity.Role;
import com.balajihandlooms.sample.entity.User;
import com.balajihandlooms.sample.exception.DuplicateResourceException;
import com.balajihandlooms.sample.exception.InvalidCredentialsException;
import com.balajihandlooms.sample.exception.ResourceNotFoundException;
import com.balajihandlooms.sample.repository.UserRepository;
import com.balajihandlooms.sample.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public void register(RegisterRequestDTO request){
        userRepository.findByEmail(request.getEmail())
                .ifPresent(user -> {
                    throw new DuplicateResourceException("Email Already Registered, please try to login");
                });
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(Role.ROLE_ADMIN);

        userRepository.save(user);
    }

    public AuthResponseDTO login(LoginRequestDTO request) {
        String email = request.getEmail();
        String password = request.getPassword();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Email not found, please register"));
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new InvalidCredentialsException("Invalid Credentials");
        }

        String token = jwtUtil.generateToken(user);
        return new AuthResponseDTO(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
