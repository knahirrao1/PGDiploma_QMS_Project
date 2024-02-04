package com.app.entities;

import java.time.LocalDate;

import javax.persistence.*;

import lombok.*;

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
