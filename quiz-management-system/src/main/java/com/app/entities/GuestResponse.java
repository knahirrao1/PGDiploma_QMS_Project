package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "guest_responses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class GuestResponse extends BaseEntity{

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "guest_name", referencedColumnName = "username"),
        @JoinColumn(name = "quiz_id", referencedColumnName = "quizId")
    })
    private Quiz quiz;

    private int score;

    @Column(name = "created_at")
    private LocalDate createdAt;

}
