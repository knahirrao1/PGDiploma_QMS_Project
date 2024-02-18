package com.app.service;

import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.QuestionDao;
import com.app.dao.UserDao;
import com.app.dto.ApiResponse;
import com.app.entities.Question;
import com.app.entities.User;

@Service("image_db")
@Transactional
public class ImageHandlingServiceImplDB implements ImageHandlingService {
	@Autowired
	private UserDao userRepository;

	@Autowired
	private QuestionDao questionRepository;
	
	@Override
	public ApiResponse uploadImageUser(String username, MultipartFile image) throws IOException {
		User user = userRepository.findById(username).
				orElseThrow(() -> 
				new ResourceNotFoundException("Invalid username!!!!"));
		user.setProfileImg(image.getBytes());
		return new ApiResponse("Image file uploaded successfully for username:  " + username);
	}

	@Override
	public byte[] downloadImageUser(String username) throws IOException {
		User user = userRepository.findById(username).orElseThrow(() -> new ResourceNotFoundException("Invalid emp ID!!!!"));
		return user.getProfileImg();
	}

	@Override
	public ApiResponse uploadImageQuestion(Long questionId, MultipartFile image) throws IOException {
		Question question = questionRepository.findById(questionId).
				orElseThrow(() -> 
				new ResourceNotFoundException("Invalid question id!!!!"));
		question.setImage(image.getBytes());
		return new ApiResponse("Image file uploaded successfully for questionId:  " + questionId);
	}

	@Override
	public byte[] downloadImageQuestion(Long questionId) throws IOException {
		Question question = questionRepository.findById(questionId).orElseThrow(()->new ResourceNotFoundException("Invalid question id: "+questionId));
		return question.getImage();
	}

}
