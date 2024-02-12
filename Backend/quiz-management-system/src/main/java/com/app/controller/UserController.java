package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.AuthRequestDTO;
import com.app.dto.UserDTO;
import com.app.service.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers() {
		try {
			List<UserDTO> users = userService.getAllUsers();
			return ResponseEntity.ok(users);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
	}

	@GetMapping("/users/{username}")
	public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
		try {
			UserDTO user = userService.getUserById(username);
			return ResponseEntity.status(HttpStatus.OK).body(user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUpUser(@RequestBody UserDTO user) {
		try {
			userService.signupUser(user);
			return new ResponseEntity<>(user.getUsername(), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody AuthRequestDTO request) {
		try {
			return new ResponseEntity<>(userService.loginUser(request), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}

	@PutMapping("/users/{username}")
	public ResponseEntity<?> updateUser(@RequestBody UserDTO user) {
		try {
			return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/users/{username}")
	public ResponseEntity<?> deleteUser(@PathVariable String username) {
		try {
			return new ResponseEntity<>(userService.deleteUserById(username), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
