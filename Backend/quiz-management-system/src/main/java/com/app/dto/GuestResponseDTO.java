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
public class GuestResponseDTO {

	private GuestIdDTO key;
	@JsonProperty(access=Access.READ_ONLY)
	private String quizTitle;
	private int score;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate createdAt;

}
