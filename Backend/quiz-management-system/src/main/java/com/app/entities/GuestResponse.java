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
public class GuestResponse{
    
    @EmbeddedId
    private GuestEntity key;

    private int score;

    @Column(name = "created_at")
    private LocalDate createdAt;

}
