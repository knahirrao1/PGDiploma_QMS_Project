package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class AuthResponseDTO {
	private String username;
	private String email;
	private byte[] profileImg;
	private String userType;
}
