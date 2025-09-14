package com.example.newsPortal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDto {
	
	private String token;
	private String tokenType = "Bearer";
	private Long userId;
	private String username;
	
	public AuthResponseDto(String token, Long userId, String username) {
		this.token = token;
		this.userId = userId;
		this.username = username;
	}
}
