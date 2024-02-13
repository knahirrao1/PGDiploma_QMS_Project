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

	@JsonProperty(value="quizId",access = Access.READ_ONLY)
	private long quizId;
	private Long id;
	private int marks;
	private int attemptNumber;
	private String response;
	private LocalDate createdAt;

}
