package com.example.newsPortal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpDto {
	
	@NotBlank(message = "Username cannot be blank")
	private String username;
	
	@NotBlank(message = "Full Name cannot be blank")
	private String fullName;
	
	@Email(message = "Please provide a valid email address")
	@NotBlank(message = "Email cannot be blank")
	private String email;
	
	@Size(min = 8, message = "Password must be at least 8 characters long")
	@NotBlank(message = "Password cannot be blank")
	private String password;

}
