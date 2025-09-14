package com.example.newsPortal.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Username cannot be blank")
	@Column(nullable = false, unique = true)
	private String username;
	
	@NotBlank(message = "Full Name cannot be blank")
	@Column(name = "full_name")
	private String fullName;
	
	@Email(message = "Please provide a valid email address")
	@NotBlank(message = "Email cannot be blank")
	@Column(nullable = false, unique = true)
	private String email;
	
	@Size(min = 8, message = "Password must be at least 8 characters long")
	@NotBlank(message = "Password cannot be blank")
	@Column(nullable = false)
	private String password;
	
	@CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
	
	
	public User(String username, String fullName, String email, String password) {
		this.username = username;
		this.fullName = fullName;
		this.email = email;
		this.password = password;
	}
	
	

}
