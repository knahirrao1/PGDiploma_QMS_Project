package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.QuizDao;
import com.app.dao.ResponseDao;
import com.app.dao.UserDao;
import com.app.dto.ResponseDTO;
import com.app.entities.Quiz;
import com.app.entities.Response;
import com.app.entities.User;

@Service
@Transactional
public class ResponseServiceImpl implements ResponseService {
	private static final Logger logger = LogManager.getLogger(ModuleServiceImpl.class);
	@Autowired
	private ResponseDao responseRepository;
	@Autowired
	private UserDao userRepository;
	@Autowired
	private QuizDao quizRepository;
	@Autowired
	private ModelMapper mapper;

	private ResponseDTO mapResponseToDTO(Response response) {
		ResponseDTO responseDTO = mapper.map(response, ResponseDTO.class);
		responseDTO.setQuizId(response.getQuiz().getId());
		responseDTO.setUsername(response.getUser().getUsername());
		logger.info("response details" + responseDTO.toString());
		return responseDTO;
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public ResponseDTO getResponseById(Long id) {
		Response response = responseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Respone not found with this id"));
		return mapResponseToDTO(response);
	}

//----------------------------------------------------------------------------------------------------------------------
	@Override
	public List<ResponseDTO> getResponseByUsername(String username) {
//here findByUsername is changed to findById
		User user = userRepository.findById(username)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid username!"));
//		if (user == null)
//			throw new ResourceNotFoundException("Invalid username!");
		return responseRepository.findByUser(user).stream().map(this::mapResponseToDTO).collect(Collectors.toList());
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public List<ResponseDTO> getResponseByQuizId(Long quizId) {
		Quiz quiz = quizRepository.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz not found with this id"));
		return responseRepository.findByQuiz(quiz).stream().map(this::mapResponseToDTO).collect(Collectors.toList());
	}

//----------------------------------------------------------------------------------------------------------------------
	@Override
	public ResponseDTO saveResponse(ResponseDTO response) {
		
		User user = userRepository.findById(response.getUsername()).orElseThrow(() -> new ResourceNotFoundException("user does not exist!!"));
		
		Quiz quiz = quizRepository.findById(response.getQuizId()).orElseThrow(
				() -> new ResourceNotFoundException("quiz does not exist!!"));
		
		Response newResponse = mapper.map(response, Response.class);
		
		newResponse.setUser(user);
		
		newResponse.setQuiz(quiz);
		
		if (!userRepository.existsById(response.getUsername())) {
			throw new ResourceNotFoundException("Invalid username!");
		}
		
		if (!responseRepository.existsByUserUsernameAndQuizId(response.getUsername(), response.getQuizId())) {
			return mapResponseToDTO(responseRepository.save(newResponse));
		}

		Response oldResponse = responseRepository.findByUserUsernameAndQuizId(newResponse.getUser().getUsername(),
				response.getQuizId());

		oldResponse.setAttemptNumber(oldResponse.getAttemptNumber() + 1);
		oldResponse.setCreatedAt(LocalDate.now());
		oldResponse.setMarks(response.getMarks());
		oldResponse.setResponse(response.getResponse());
		logger.info("response details" + oldResponse.toString());
		return mapResponseToDTO(responseRepository.save(oldResponse));
	}

//----------------------------------------------------------------------------------------------------------------------    
	@Override
	public void deleteResponse(Long id) {
		Response response = responseRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Enter valid response id!!!"));
		responseRepository.delete(response);
	}
}
