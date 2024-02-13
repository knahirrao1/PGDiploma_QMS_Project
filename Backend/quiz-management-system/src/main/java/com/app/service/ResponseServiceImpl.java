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
        logger.info("response details"+responseDTO.toString());
        return responseDTO;
    }

	@Override
	public List<ResponseDTO> getAllResponses() {
		return responseRepository.findAll().stream().map(this::mapResponseToDTO)
				.collect(Collectors.toList());
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
		return responseRepository.findByUser(user).stream().map(this::mapResponseToDTO)
				.collect(Collectors.toList());
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public List<ResponseDTO> getResponseByQuizId(Long quizId) {
		Quiz quiz = quizRepository.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz not found with this id"));
		return responseRepository.findByQuiz(quiz).stream().map(this::mapResponseToDTO)
				.collect(Collectors.toList());
	}

//----------------------------------------------------------------------------------------------------------------------
	@Override
	public ResponseDTO saveResponse(Response response) {
		String existingUsername = response.getUser().getUsername();
		Quiz existingQuiz = response.getQuiz();

		if (existingUsername == null && existingQuiz == null) {
			return mapper.map(responseRepository.save(response), ResponseDTO.class);
		}

		List<Response> existingResponses = getResponseByUsername(existingUsername).stream()
				.map(resp -> mapper.map(resp, Response.class)).collect(Collectors.toList());
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
		return mapResponseToDTO(responseRepository.save(oldResponse));
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
