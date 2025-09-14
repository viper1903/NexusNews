package com.example.newsPortal.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.newsPortal.dto.AuthResponseDto;
import com.example.newsPortal.dto.LoginDto;
import com.example.newsPortal.dto.SignUpDto;
import com.example.newsPortal.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	private final AuthService authService;
	
	public AuthController(AuthService authService) {
		this.authService = authService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@Valid @RequestBody SignUpDto signUpDto) {
		try {
			authService.registerUser(signUpDto);
			return new ResponseEntity<> ( "User registered successfully!", HttpStatus.CREATED);
		} catch (IllegalStateException e ) {
			return new ResponseEntity<> (e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDto> loginUser(@Valid @RequestBody LoginDto loginDto) {
		AuthResponseDto authResponse = authService.loginUser(loginDto);
		return ResponseEntity.ok(authResponse);
	}

}
