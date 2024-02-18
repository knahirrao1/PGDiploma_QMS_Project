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
public class QuizDTO {

	@JsonProperty(value="quizId",access = Access.READ_ONLY)
	private long id;
	private Long moduleId;
	private String title;
	@JsonProperty(access = Access.READ_ONLY)
	private int numberOfQuestions;
	@JsonProperty(access = Access.READ_ONLY)
	private int totalAttempted;
	private Boolean openToGuest;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate createdAt;

}
