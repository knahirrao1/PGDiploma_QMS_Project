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
public class QuizDTO {

   //private Long id; // Assuming BaseEntity has an id field
    private ModuleDTO module;
    private String title;
    private int numberOfQuestions;
    private int totalAttempted;
    private Boolean openToGuest;
    private LocalDate createdAt;

}
