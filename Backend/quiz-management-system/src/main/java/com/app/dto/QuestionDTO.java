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
public class QuestionDTO {

	@JsonProperty(value="question_id",access = Access.READ_ONLY)
	private long id;
	private Long quizId;
	private String question;
	private byte[] image;
//	@JsonProperty(access = Access.WRITE_ONLY)
//	private byte[] imageOutput; 
	private String optionA;
	private String optionB;
	private String optionC;
	private String optionD;
	private char correctOption;
	private String explanation;
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDate createdAt;

}
