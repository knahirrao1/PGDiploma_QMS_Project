package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.QuizDTO;
import com.app.service.QuizService;

@RestController
@RequestMapping("/quizzes")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {
	@Autowired
	private QuizService quizService;

	@GetMapping
	public ResponseEntity<?> getAllQuizzes() {
		try {
			List<QuizDTO> quizzes = quizService.getAllQuizzes();
			return new ResponseEntity<>(quizzes, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/modules/{moduleId}")
	public ResponseEntity<?> getQuizzesByModuleId(@PathVariable Long moduleId) {
		try {
			List<QuizDTO> quizzes = quizService.getQuizzesByModuleId(moduleId);
			return new ResponseEntity<>(quizzes, HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	public ResponseEntity<?> createQuiz(@RequestBody QuizDTO quiz) {
		try {
			QuizDTO createdQuiz = quizService.createQuiz(quiz);
			return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/{quizId}")
	public ResponseEntity<?> getQuizByQuizId(@PathVariable Long quizId) {
		try {
			return new ResponseEntity<>(quizService.getQuizByQuizId(quizId), HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/{quizId}")
	public ResponseEntity<?> updateQuiz(@PathVariable Long quizId, @RequestBody QuizDTO updatedQuiz) {
		try {
			QuizDTO updatedQuizResult = quizService.updateQuiz(quizId, updatedQuiz);
			return new ResponseEntity<>(updatedQuizResult, HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/{quizId}")
	public ResponseEntity<?> deleteQuiz(@PathVariable Long quizId) {
		try {
			quizService.deleteQuiz(quizId);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(new ApiResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
		}
	}

}
