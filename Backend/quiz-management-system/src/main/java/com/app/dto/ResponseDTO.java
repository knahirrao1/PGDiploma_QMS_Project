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
	@JsonProperty(access=Access.READ_ONLY)
	private String quizTitle;
	@JsonProperty(value="responseId",access = Access.READ_ONLY)
	private Long id;
	private String username;
	private int marks;
	@JsonProperty(access = Access.READ_ONLY)
	private int attemptNumber;
	private String response;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate createdAt;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
}
