package com.app.service;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.QuizDao;
import com.app.dao.ResponseDao;
import com.app.dao.UserDao;
import com.app.entities.Quiz;
import com.app.entities.Response;
import com.app.entities.User;

@Service
@Transactional
public class ResponseServiceImpl implements ResponseService {
	@Autowired
	private ResponseDao responseRepository;
	@Autowired
	private UserDao userRepository;
	@Autowired
	private QuizDao quizRepository;

	@Override
	public List<Response> getAllResponses() {
		return responseRepository.findAll();
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public Response getResponseById(Long id) {
		return responseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Respone not found with this id"));
	}

//----------------------------------------------------------------------------------------------------------------------
	@Override
	public List<Response> getResponseByUsername(String username) {
//here findByUsername is changed to findById
		User user = userRepository.findById(username).orElseThrow(() -> new ResourceNotFoundException("Invalid username!"));
//		if (user == null)
//			throw new ResourceNotFoundException("Invalid username!");
		return responseRepository.findByUser(user);
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public List<Response> getResponseByQuizId(Long quizId) {
		Quiz quiz = quizRepository.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz not found with this id"));
		return responseRepository.findByQuiz(quiz);
	}

//----------------------------------------------------------------------------------------------------------------------
	@Override
	public Response saveResponse(Response response) {
		String existingUsername = response.getUser().getUsername();
		Quiz existingQuiz = response.getQuiz();

		if (existingUsername == null && existingQuiz == null) {
			return responseRepository.save(response);
		}

		List<Response> existingResponses = getResponseByUsername(existingUsername);
		Response oldResponse = new Response();
		for (int i = 0; i < existingResponses.size(); i++) {
			if (existingResponses.get(i).getQuiz() == existingQuiz)
				oldResponse = existingResponses.get(i);
		}
		oldResponse.setAttemptNumber(oldResponse.getAttemptNumber() + 1);
		oldResponse.setCreatedAt(LocalDate.now());
		oldResponse.setMarks(response.getMarks());
		oldResponse.setResponse(response.getResponse());
		oldResponse.setId(response.getId());
		return responseRepository.save(oldResponse);
	}

//----------------------------------------------------------------------------------------------------------------------    
	@Override
	public void deleteResponse(Long id) {
		try {
			responseRepository.deleteById(id);
		} catch (RuntimeException e) {
			throw e;
		}
	}
}
