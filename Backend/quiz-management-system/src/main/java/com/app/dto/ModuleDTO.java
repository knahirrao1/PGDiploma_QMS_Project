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
public class ModuleDTO {
	
	@JsonProperty(value="module_id",access = Access.READ_ONLY)
	private long id;
	private String username;
	private String title;
	private String description;
	private String numberOfQuizzes;
	private LocalDate createdAt;

}
