package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "quizzes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Quiz extends BaseEntity {

	private String title;

	@Column(name = "no_of_que")
	private int numberOfQuestions;

	@Column(name = "total_attempted")
	private int totalAttempted;

	@Column(name = "open_to_guest")
	private Boolean openToGuest;

	@Column(name = "created_at")
	private LocalDate createdAt;
	
	@ManyToOne
	@JoinColumn(name = "module_id", nullable = false, foreignKey = @ForeignKey(name = "fk_quiz_module"))
	private Module module;
	
	@OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Response> responses = new ArrayList<>();
	
	@OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();
	
	@OneToMany(mappedBy = "key.quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestResponse> guestResponses = new ArrayList<>();


}