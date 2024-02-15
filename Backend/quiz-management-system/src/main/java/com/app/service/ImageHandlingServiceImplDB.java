package com.app.service;

import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.dto.ApiResponse;
import com.app.entities.User;

@Service("image_db")
@Transactional
public class ImageHandlingServiceImplDB implements ImageHandlingService {
	@Autowired
	private UserDao userRepository;

	@Override
	public ApiResponse uploadImage(String username, MultipartFile image) throws IOException {
		User user = userRepository.findById(username).
				orElseThrow(() -> 
				new ResourceNotFoundException("Invalid username!!!!"));
		user.setProfileImg(image.getBytes());
		return new ApiResponse("Image file uploaded successfully for username:  " + username);
	}

	@Override
	public byte[] downloadImage(String username) throws IOException {
		User user = userRepository.findById(username).orElseThrow(() -> new ResourceNotFoundException("Invalid emp ID!!!!"));
		return user.getProfileImg();
	}

}
