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
public class ResponseDTO {

    //private Long id; // Assuming BaseEntity has an id field
    private UserDTO user;
    private QuizDTO quiz;
    private int marks;
    private int attemptNumber;
    private String response;
    private LocalDate createdAt;

}
