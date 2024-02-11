package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.GuestIdDTO;
import com.app.dto.GuestResponseDTO;
import com.app.entities.GuestId;
import com.app.entities.GuestResponse;
import com.app.service.GuestResponseService;
import com.app.service.QuizService;

@RestController
@RequestMapping("/guestresponses")
public class GuestResponseController {
	@Autowired
	private GuestResponseService guestResponseService;

	@Autowired
	private QuizService quizService;

	@PostMapping
	public ResponseEntity<?> createGuestResponse(@Valid @RequestBody GuestResponseDTO guestResponse) {
		try {
			return new ResponseEntity<>(guestResponseService.saveGuestResponse(guestResponse), HttpStatus.CREATED);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/{quizId}")
	public ResponseEntity<?> getGuestResponseByQuizId(@PathVariable Long quizId) {
		try {
			return new ResponseEntity<>(
					guestResponseService.getGuestResponseByQuizId(quizService.getQuizByQuizId(quizId)), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping("/{quizId}/{username}")
	public ResponseEntity<?> getGuestResponse(@PathVariable Long quizId, @PathVariable String username) {
		try {
			return new ResponseEntity<>(guestResponseService
					.getGuestResponseById(quizId, username), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}

	}

	@DeleteMapping("/{quizId}/{username}")
	public ResponseEntity<?> deleteGuestResponse(@PathVariable Long quizId, @PathVariable String username) {
		try {
			guestResponseService.deleteGuestResponse(new GuestIdDTO(quizService.getQuizByQuizId(quizId), username));
			return new ResponseEntity<>(new ApiResponse("deleted sucessfully"), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
}
