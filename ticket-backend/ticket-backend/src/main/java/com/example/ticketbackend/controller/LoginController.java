package com.example.ticketbackend.controller;

import com.example.ticketbackend.domain.User;
import com.example.ticketbackend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public User login(@RequestParam String userId) {

        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("유효하지 않은 ID입니다."));
    }
}
