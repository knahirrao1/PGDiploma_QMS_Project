package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.MediaType.*;
import com.app.service.ImageHandlingService;

@RestController
@RequestMapping("/images")
@CrossOrigin
public class ImageController {
	
	@Autowired
	@Qualifier("image_db")
	private ImageHandlingService imgService;
	
	@PostMapping(value = "/{username}", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadImage(@PathVariable String username, 
			@RequestParam MultipartFile imageFile)
			throws IOException {
		System.out.println("in upload img " + username);
		return ResponseEntity.status(HttpStatus.CREATED).body(imgService.uploadImage(username, imageFile));
	}

	@GetMapping(value = "/{username}", produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE, ALL_VALUE })
	public ResponseEntity<?> serveEmpImage(@PathVariable String username) throws IOException {
		System.out.println("in download img " + username);
		return ResponseEntity.ok(imgService.downloadImage(username));
	}
	
}
