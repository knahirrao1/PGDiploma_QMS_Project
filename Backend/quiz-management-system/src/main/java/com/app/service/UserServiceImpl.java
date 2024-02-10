package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ApiException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.dto.AuthRequestDTO;
import com.app.dto.AuthResponseDTO;
import com.app.dto.UserDTO;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userRepository;

//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private ModelMapper mapper;

	@Override
	public AuthResponseDTO loginUser(AuthRequestDTO request) {
		// Find user by email
		User user = userRepository.findById(request.getUsername()).orElseThrow(() -> new ApiException("user not found"));

		// Check if the provided password matches the stored hashed password
//		if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//			return mapper.map(user, AuthResponseDTO.class); // Login successful
//		}

		if (request.getPassword().equals(user.getPassword())) {
			return mapper.map(user, AuthResponseDTO.class); // Login successful
		}

		throw new ApiException("incorrect password"); // Incorrect password
	}

	// String username, String email, String password, String userType
	@Override
	public void signupUser(UserDTO user) {
		// Check if username is unique
		if (userRepository.existsById(user.getUsername())) {
			throw new ApiException("username already exists"); // Username already exists
		}

		// Check if email is unique
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new ApiException("email already exists"); // Email already exists
		}

		// Validate userType (assuming valid values are "A", "B", or "C")
		if (!isValidUserType(user.getUserType())) {
			throw new ApiException("invalid usertype"); // Invalid userType
		}

		// Create a new user
		User u = mapper.map(user, User.class);

		u.setCreatedAt(LocalDate.now());

		// Save the user to the database
		userRepository.save(u);
	}

	private boolean isValidUserType(String userType) {
		// Add your userType validation logic here (e.g., check if it is "A", "B", or
		// "C")
		return userType.equals("U") || userType.equals("A") || userType.equals("S");
	}

	@Override
	public List<UserDTO> getAllUsers() {
		// Retrieve all users from the repository
		return userRepository.findAll().stream().map(user -> mapper.map(user, UserDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public UserDTO getUserById(String username) {
		// Retrieve a user by user ID from the repository
		return mapper.map(
				userRepository.findById(username).orElseThrow(() -> new ResourceNotFoundException("invalid username")),
				UserDTO.class);
	}

	@Override
	public String deleteUserById(String username) {
		// Check if the user exists
		if (!userRepository.existsById(username)) {
			new ResourceNotFoundException("invalid username"); // User not found
		}

		// Delete the user by user ID
		userRepository.deleteById(username);

		return "deletion sucessful"; // Deletion successful
	}

	@Override
	public UserDTO updateUser(UserDTO user) {
		// Check if the user exists
		User u = userRepository.findById(user.getUsername())
				.orElseThrow(() -> new ResourceNotFoundException("invalid username"));

		u.setName(user.getName());
		u.setDescription(user.getDescription());
		u.setPassword(user.getPassword());
		u.setProfileImg(user.getProfileImg());

		return mapper.map(userRepository.save(u), UserDTO.class); // Deletion successful
	}
}
