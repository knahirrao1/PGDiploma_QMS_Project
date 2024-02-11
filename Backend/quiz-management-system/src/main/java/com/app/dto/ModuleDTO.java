package com.app.dto;

import java.time.LocalDate;

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
public class ModuleDTO {

	private String username;
	private String title;
	private String description;
	private String numberOfQuizzes;
	private LocalDate createdAt;

}
