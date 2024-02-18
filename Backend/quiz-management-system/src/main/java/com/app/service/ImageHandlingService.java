package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;

public interface ImageHandlingService {
	ApiResponse uploadImageUser(String username, MultipartFile image) throws IOException;
	byte[] downloadImageUser(String username) throws IOException;
	
	ApiResponse uploadImageQuestion(Long questionId, MultipartFile image) throws IOException;
	byte[] downloadImageQuestion(Long questionId) throws IOException;
}
