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

	@JsonProperty(value="username_id",access = Access.READ_ONLY)
	private String username;
	private String userType;
	private String email;
	private String name;
	private String password;
	private String description;
	private byte[] profileImg;
	private LocalDate createdAt;

}
