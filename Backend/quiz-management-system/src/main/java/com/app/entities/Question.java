package com.app.entities;

import java.time.LocalDate;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Question extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "quiz_id", nullable = false, foreignKey = @ForeignKey(name = "fk_question_quiz"))
	private Quiz quiz;

	@Column(columnDefinition = "TEXT")
	private String question;

	@Lob
	private byte[] image;

	@Column(name = "option_a")
	private String optionA;

	@Column(name = "option_b")
	private String optionB;

	@Column(name = "option_c")
	private String optionC;

	@Column(name = "option_d")
	private String optionD;

	@Column(name = "correct_option")
	private char correctOption;

	private String explanation;

	@Column(name = "created_at")
	private LocalDate createdAt;

}
