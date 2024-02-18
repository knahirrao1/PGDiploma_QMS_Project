package com.app.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {

	private String username;
	private String userType;
	private String email;
	private String name;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	private String description;
	@JsonProperty(access = Access.READ_ONLY)
	private byte[] profileImg;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate createdAt;

}
