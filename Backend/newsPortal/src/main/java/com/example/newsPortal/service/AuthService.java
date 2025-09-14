package com.example.newsPortal.service;

import com.example.newsPortal.dto.AuthResponseDto;
import com.example.newsPortal.dto.LoginDto;
import com.example.newsPortal.dto.SignUpDto;

public interface AuthService {
	
	void registerUser(SignUpDto signUpDto);
	AuthResponseDto loginUser(LoginDto loginDto);
}
