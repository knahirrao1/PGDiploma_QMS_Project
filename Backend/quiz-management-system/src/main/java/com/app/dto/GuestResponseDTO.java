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
public class GuestResponseDTO {

//	private long quizId;
//	private String username;
	private GuestIdDTO key;
	private int score;
	private LocalDate createdAt;

}
