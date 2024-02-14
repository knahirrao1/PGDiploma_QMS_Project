package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true,exclude = {"modules","responses"})
public class User {

	@Id
	private String username;

	@Column(name = "user_type")
	private String userType;

	private String email;
	private String password;
	private String name;
	private String description;

	@Lob
	@Column(name = "profile_img")
	private byte[] profileImg;

	@Column(name = "created_at")
	private LocalDate createdAt;

	
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Module> modules = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Response> responses = new ArrayList<>();
}
