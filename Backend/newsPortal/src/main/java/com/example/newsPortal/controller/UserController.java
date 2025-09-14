package com.example.newsPortal.controller;

import com.example.newsPortal.dto.ProfileDto;
import com.example.newsPortal.service.UserService; // Import UserService
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileDto> getCurrentUserProfile() {
        ProfileDto profileDto = userService.getUserProfile();
        return ResponseEntity.ok(profileDto);
    }
}