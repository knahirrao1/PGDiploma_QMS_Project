package com.app.entities;

import java.time.LocalDate;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "responses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Response extends BaseEntity {

	private int marks;

	@Column(name = "attempt_no")
	private int attemptNumber;

	private String response;

	@Column(name = "created_at")
	private LocalDate createdAt;

	@ManyToOne
	@JoinColumn(name = "username", nullable = false, foreignKey = @ForeignKey(name = "fk_response_user"))
	private User user;

	@ManyToOne
	@JoinColumn(name = "quiz_id", nullable = false, foreignKey = @ForeignKey(name = "fk_response_quiz"))
	private Quiz quiz;
	
}