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
public class ResponseDTO {

	private Long quizId;
	@JsonProperty(value="responseId",access = Access.READ_ONLY)
	private Long id;
	private String username;
	private int marks;
	private int attemptNumber;
	private String response;
	private LocalDate createdAt;

}
