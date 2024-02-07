package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.entities.User;

public interface UserService {
	public boolean loginUser(String email, String password);
	
	public boolean signupUser(String username, String email, String password, String userType);
	
	public List<User> getAllUsers();
	
	public Optional<User> getUserById(String username);
	
	public boolean deleteUserById(String username);
}
