package com.app.service;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.SecretKeySpec;
import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
	private static final Logger logger = LogManager.getLogger(ModuleServiceImpl.class);

	@Autowired
	private UserDao userRepository;

//	@Autowired
//	private PasswordEncoder passwordEncoder;

	@Autowired
	private ModelMapper mapper;

	private UserDTO mapUserToDTO(User user) {
		UserDTO userDTO = mapper.map(user, UserDTO.class);
		userDTO.setPassword(null);
		logger.info("user details" + userDTO.toString());
		return userDTO;
	}

	@Override
	public AuthResponseDTO loginUser(AuthRequestDTO request) throws Exception {
		// Find user by email
		User user = userRepository.findById(request.getUsername()).orElseThrow();

		// Check if the user exists
		if (user == null) {
			throw new ApiException("user not found"); // User not found
		}

		// Check if the provided password matches the stored encrypted password
//		if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//			return mapper.map(user, AuthResponseDTO.class); // Login successful
//		}

		if (request.getPassword().equals(passwordDecrypt(user.getPassword()))) {
			return mapper.map(user, AuthResponseDTO.class); // Login successful
		}

		else
			throw new ApiException("incorrect password"); // Incorrect password
	}

	// String username, String email, String password, String userType
	@Override
	public void signupUser(UserDTO user) throws Exception {
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

		if (user.getPassword() == null) {
			throw new ApiException("password cannot be null"); // Invalid userType
		}

		if (user.getName() == null) {
			throw new ApiException("name cannot be null");
		}

		// Create a new user
		User u = mapper.map(user, User.class);

		// Encoding password before adding user to the database
		u.setPassword(passwordEncrypt(u.getPassword()));

		// Save the user to the database
		userRepository.save(u);
	}

	private boolean isValidUserType(String userType) {
		// Add your userType validation logic here (e.g., check if it is "A", "B", or
		// "C")
		return userType.equals("U") || userType.equals("A");
	}

	@Override
	public List<UserDTO> getAllUsers() {
		// Retrieve all users from the repository
		return userRepository.findAll().stream().map(this::mapUserToDTO).collect(Collectors.toList());
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
	public UserDTO updateUser(UserDTO user) throws Exception {
		// Check if the user exists
		User u = userRepository.findById(user.getUsername())
				.orElseThrow(() -> new ResourceNotFoundException("invalid username"));

		if ((u.getEmail()).equals(user.getEmail())) {
			u.setName(user.getName());
			u.setDescription(user.getDescription());
			u.setPassword(passwordEncrypt(user.getPassword()));
			return mapper.map(userRepository.save(u), UserDTO.class); // Update successful
		} else if (userRepository.existsByEmail(user.getEmail())) {
			throw new ApiException("email already exists"); // Email already exists
		} else {
			u.setName(user.getName());
			u.setDescription(user.getDescription());
			u.setPassword(passwordEncrypt(user.getPassword()));
			return mapper.map(userRepository.save(u), UserDTO.class); // Update successful
		}
	}

//-----------------------------------------------------------------------------------------------------------------------------
	// For password Encryption and Decryption
	private static final String AES_ALGORITHM = "AES";
	//private static final String ENCRYPTION_KEY = "123456789101112131415@qms"; //

	public static String passwordEncrypt(String plainText) throws Exception {
		String aesKey = "NwtCpcQuCgVX2iGJdSyrAyr0Ux82KOJjnWhsufDc2j0=";
		Key key = new SecretKeySpec(Base64.getDecoder().decode(aesKey), AES_ALGORITHM);
		Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
		cipher.init(Cipher.ENCRYPT_MODE, key);
		byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());
		return Base64.getEncoder().encodeToString(encryptedBytes);
	}

	public static String passwordDecrypt(String encryptedText) throws Exception {
		String aesKey = "NwtCpcQuCgVX2iGJdSyrAyr0Ux82KOJjnWhsufDc2j0=";
		Key key = new SecretKeySpec(Base64.getDecoder().decode(aesKey), AES_ALGORITHM);
		Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
		cipher.init(Cipher.DECRYPT_MODE, key);
		byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
		return new String(decryptedBytes);
	}

	public static String generateAESKey() throws NoSuchAlgorithmException {
		KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
		SecureRandom secureRandom = new SecureRandom();
		keyGenerator.init(256, secureRandom); // 256-bit key length
		return Base64.getEncoder().encodeToString(keyGenerator.generateKey().getEncoded());
	}

}
