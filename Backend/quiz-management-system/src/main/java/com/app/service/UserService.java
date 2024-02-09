package com.app.service;

import java.util.List;

import com.app.dto.AuthRequestDTO;
import com.app.dto.AuthResponseDTO;
import com.app.dto.UserDTO;

public interface UserService {
	public AuthResponseDTO loginUser(AuthRequestDTO request);
	
	public void signupUser(UserDTO user);
	
	public List<UserDTO> getAllUsers();
	
	public UserDTO getUserById(String username);
	
	public String deleteUserById(String username);

	public UserDTO updateUser(UserDTO user);
}
