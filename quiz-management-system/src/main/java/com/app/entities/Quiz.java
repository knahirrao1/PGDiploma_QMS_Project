package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "quizzes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Quiz extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "module_id", nullable = false, foreignKey = @ForeignKey(name = "fk_quiz_module"))
    private Module module;

    private String title;

    @Column(name = "no_of_que")
    private int numberOfQuestions;

    @Column(name = "total_attempted")
    private int totalAttempted;

    @Column(name = "open_to_guest")
    private Boolean openToGuest;

    private String hashtags;

    @Column(name = "created_at")
    private LocalDate createdAt;

}

