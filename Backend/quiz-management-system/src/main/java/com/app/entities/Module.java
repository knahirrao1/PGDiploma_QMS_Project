package com.app.entities;

import java.time.LocalDate;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "modules")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Module extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "username", nullable = false, foreignKey = @ForeignKey(name = "fk_module_user"))
	private User username;

	private String title;
	private String description;

	@Column(name = "no_of_quizzes")
	private int numberOfQuizzes;

	@Column(name = "created_at")
	private LocalDate createdAt;

}
