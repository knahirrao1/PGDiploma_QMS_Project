package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;

public interface UserDao extends JpaRepository<User, String> {

	User findByEmail(String email);

	User findByUsername(String username);

	boolean existsByEmail(String email);

}
