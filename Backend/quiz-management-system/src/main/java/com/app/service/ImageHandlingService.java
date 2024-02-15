package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;

public interface ImageHandlingService {
	ApiResponse uploadImage(String username, MultipartFile image) throws IOException;
	byte[] downloadImage(String username) throws IOException;
}
