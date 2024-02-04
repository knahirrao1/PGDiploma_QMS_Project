package com.app.entities;

import java.time.LocalDate;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    @Id
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @Lob
    private byte[] profileImage;

    @Column(name = "created_at")
    private LocalDate createdAt;

}