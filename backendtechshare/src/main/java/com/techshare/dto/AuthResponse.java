package com.techshare.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
	private String token;
	private String role;
	private String message;
	private boolean success;

	public AuthResponse(String token, String role) {
		this.token = token;
		this.role = role;
		this.success = true;
	}

	public AuthResponse(String message, String role, boolean success) {
		this.message = message;
		this.role = role;
		this.success = success;
	}
}
