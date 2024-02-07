package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.UserDao;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userRepository;
	
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
    @Override
    public boolean loginUser(String email, String password) {
        // Find user by email
        User user = userRepository.findByEmail(email);

        // Check if the user exists
        if (user == null) {
            return false; // User not found
        }

        // Check if the provided password matches the stored hashed password
        if (passwordEncoder.matches(password, user.getPassword())) {
            return true; // Login successful
        }

        return false; // Incorrect password
    }
    
    @Override
    public boolean signupUser(String username, String email, String password, String userType) {
        // Check if username is unique
        if (userRepository.existsById(username)) {
            return false; // Username already exists
        }

        // Check if email is unique
        if (userRepository.existsByEmail(email)) {
            return false; // Email already exists
        }

        // Validate password (add your own password validation logic)
        if (!isValidPassword(password)) {
            return false; // Invalid password
        }

        // Validate userType (assuming valid values are "A", "B", or "C")
        if (!isValidUserType(userType)) {
            return false; // Invalid userType
        }

        // Create a new user
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Encode the password
        user.setUserType(userType);

        // Save the user to the database
        userRepository.save(user);

        return true; // Signup successful
    }

    private boolean isValidPassword(String password) {
        // Add your password validation logic here (e.g., minimum length, complexity requirements)
        return password.length() >= 8;
    }

    private boolean isValidUserType(String userType) {
        // Add your userType validation logic here (e.g., check if it is "A", "B", or "C")
        return userType.equals("U") || userType.equals("A") || userType.equals("S");
    }
    
    @Override
    public List<User> getAllUsers() {
        // Retrieve all users from the repository
        return userRepository.findAll();
    }
    
    @Override
    public Optional<User> getUserById(String username) {
        // Retrieve a user by user ID from the repository
        return userRepository.findById(username);
    }
    
    @Override
    public boolean deleteUserById(String username) {
        // Check if the user exists
        if (!userRepository.existsById(username)) {
            return false; // User not found
        }

        // Delete the user by user ID
        userRepository.deleteById(username);

        return true; // Deletion successful
    }
}
