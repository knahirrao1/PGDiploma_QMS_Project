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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.ResponseDTO;
import com.app.service.ResponseService;

@RestController
@RequestMapping("/responses")
@CrossOrigin(origins = "https://pg-diploma-qms-project.vercel.app/")
public class ResponseController {
	@Autowired
	private ResponseService responseService;

//	@GetMapping
//    public ResponseEntity<?> getAllResponses() {	
//		try {
//			List<Response> responses = responseService.getAllResponses();
//			return new ResponseEntity<>(responses, HttpStatus.OK);
//		} catch (RuntimeException e) {
//			System.out.println("Error in Response controller get all responses method " + e);
//			// return err mesg wrapped in DTO : ApiResp
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
//		}
//    }

//------------------------------------------------------------------------------------------------------------------------	
	@GetMapping("/{id}")
	public ResponseEntity<?> getResponseById(@PathVariable Long id) {
		try {
			ResponseDTO response = responseService.getResponseById(id);
			// ResponseDTO responseDTO = mapper.map(response, ResponseDTO.class);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in response controller get response by id method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//------------------------------------------------------------------------------------------------------------------------
	@PostMapping
	public ResponseEntity<?> saveResponse(@RequestBody ResponseDTO newResponse) {
		try {
			return new ResponseEntity<>(responseService.saveResponse(newResponse),HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("Error in response controller save response method " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

//------------------------------------------------------------------------------------------------------------------------    
	@GetMapping("/users/{username}")
	public ResponseEntity<?> getResponsesByUsername(@PathVariable String username) {
		try {
			List<ResponseDTO> responsesByUsername = responseService.getResponseByUsername(username);
			return new ResponseEntity<>(responsesByUsername, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in response controller get response by username method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//------------------------------------------------------------------------------------------------------------------------     
	@GetMapping("/quizzes/{quizId}")
	public ResponseEntity<?> getResponsesByQuizId(@PathVariable Long quizId) {
		try {
			List<ResponseDTO> responsesByQuizId = responseService.getResponseByQuizId(quizId);
			return new ResponseEntity<>(responsesByQuizId, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in response controller get response by username method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	// ------------------------------------------------------------------------------------------------------------------------
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteResponse(@PathVariable Long id) {
		try {
			responseService.deleteResponse(id);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (RuntimeException e) {
			System.out.println("Error in response controller delete response method " + e);
			// return err mesg wrapped in DTO : ApiResp
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
}
