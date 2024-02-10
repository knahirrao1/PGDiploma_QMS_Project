package com.app.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
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
import com.app.dto.QuestionDTO;
import com.app.entities.Question;
import com.app.service.QuestionService;

@RestController
@RequestMapping("/questions")
public class QuestionController {
	@Autowired
	private QuestionService questionService;

	@Autowired
	private ModelMapper mapper;

	@GetMapping("/quizzes/{quizId}")
	public ResponseEntity<?> getQuestionsByQuizId(@PathVariable Long quizId) {
		try {
			List<Question> questions = questionService.getAllQuestionsByQuizId(quizId);
			return new ResponseEntity<>(questions, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in question controller get questions by quizid method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//--------------------------------------------------------------------------------------------------------------------------
	@GetMapping("/{questionId}")
	public ResponseEntity<?> getQuestionById(@PathVariable Long questionId) {
		try {
			Question question = questionService.getQuestionById(questionId);
			return new ResponseEntity<>(question, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in question controller get question by id method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//--------------------------------------------------------------------------------------------------------------------------
	@PostMapping("/{quizId}")
	public ResponseEntity<?> createQuestion(@PathVariable Long quizId, @RequestBody QuestionDTO newQuestion) {
		// System.out.println("in create question");
		try {
			Question question = mapper.map(newQuestion, Question.class);
			return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createQuestion(quizId, question));
		} catch (RuntimeException e) {
			System.out.println("Error in question controller create question method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
//--------------------------------------------------------------------------------------------------------------------------

	@PutMapping("/{questionId}")
	public ResponseEntity<?> updateQuestion(@PathVariable Long questionId, @RequestBody QuestionDTO newQuestion) {

		try {
			Question question = mapper.map(newQuestion, Question.class);
			Question updatedQuestion = questionService.updateQuestion(questionId, question);
			return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in question controller update question method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//---------------------------------------------------------------------------------------------------------------------------   

	@DeleteMapping("/{questionId}")
	public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
		try {
			questionService.deleteQuestion(questionId);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (RuntimeException e) {
			System.out.println("Error in question controller delete question method " + e);
			// return err message wrapped in DTO : ApiResp
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
}
