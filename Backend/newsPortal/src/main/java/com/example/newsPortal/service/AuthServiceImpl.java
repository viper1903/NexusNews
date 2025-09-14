package com.example.newsPortal.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.newsPortal.dto.AuthResponseDto;
import com.example.newsPortal.dto.LoginDto;
import com.example.newsPortal.dto.SignUpDto;
import com.example.newsPortal.model.User;
import com.example.newsPortal.repository.UserRepository;
import com.example.newsPortal.security.JwtTokenProvider;

@Service
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtTokenProvider jwtTokenProvider;

	public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	public void registerUser(SignUpDto signUpDto) {
		if (userRepository.findByUsername(signUpDto.getUsername()).isPresent()) {
			throw new IllegalStateException("Username is already taken.");
		}
		if (userRepository.findByEmail(signUpDto.getEmail()).isPresent()) {
			throw new IllegalStateException("This email is already registered.");
		}

		String hashedPassword = passwordEncoder.encode(signUpDto.getPassword());

		User newUser = new User(signUpDto.getUsername(), signUpDto.getFullName(), signUpDto.getEmail(), hashedPassword);

		userRepository.save(newUser);
	}

	@Override
	public AuthResponseDto loginUser(LoginDto loginDto) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtTokenProvider.generateToken(authentication);
		
		User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
		
		return new AuthResponseDto(token, user.getId(), user.getUsername());
	}

}
