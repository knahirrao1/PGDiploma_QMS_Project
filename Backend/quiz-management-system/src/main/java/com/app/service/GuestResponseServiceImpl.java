package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ApiException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.GuestResponseDao;
import com.app.dao.QuizDao;
import com.app.dto.GuestIdDTO;
import com.app.dto.GuestResponseDTO;
import com.app.dto.QuizDTO;
import com.app.entities.GuestId;
import com.app.entities.GuestResponse;
import com.app.entities.Quiz;

@Service
@Transactional
public class GuestResponseServiceImpl implements GuestResponseService {
	private static final Logger logger = LogManager.getLogger(ModuleServiceImpl.class);

	@Autowired
	private GuestResponseDao guestResponseRepository;

	@Autowired
	private QuizDao quizRepositiry;

	@Autowired
	private ModelMapper mapper;

	private GuestResponseDTO mapGuestResponseToDTO(GuestResponse guestResponse) {
		GuestResponseDTO guestResponseDTO = mapper.map(guestResponse, GuestResponseDTO.class);
		guestResponseDTO.getKey().setQuizId(guestResponse.getKey().getQuiz().getId());
		guestResponseDTO.setQuizTitle(guestResponse.getKey().getQuiz().getTitle());
		logger.info("Module details" + guestResponseDTO.toString());
		return guestResponseDTO;
	}

	@Override
	public GuestResponseDTO saveGuestResponse(GuestResponseDTO guestResponse) {
		Quiz quiz = quizRepositiry.findById(guestResponse.getKey().getQuizId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid quiz id!"));

		if (guestResponse.getKey().getUsername() == null) {
			throw new ApiException("Username cannot be null!");
		}

		GuestResponse guest = mapper.map(guestResponse, GuestResponse.class);

//		if (guestResponseRepository.existsById(new GuestId(quiz, guestResponse.getKey().getUsername()))) {
//			throw new ApiException("Username already exists!!");
//		}

		guest.getKey().setQuiz(quiz);

		return mapGuestResponseToDTO(guestResponseRepository.save(guest));
	}
//------------------------------------------------------------------------------------------------------------------

	@Override
	public GuestResponseDTO getGuestResponseById(Long quizId, String username) {
		GuestResponse response = guestResponseRepository
				.findById(new GuestId(quizRepositiry.findById(quizId).orElseThrow(), username))
				.orElseThrow(() -> new ResourceNotFoundException("Invalid quizid and username combination"));
		return mapGuestResponseToDTO(response);
	}


//------------------------------------------------------------------------------------------------------------------
	@Override
	public void deleteGuestResponse(GuestIdDTO key) {
		// Add validation or additional logic if needed
		guestResponseRepository.deleteById(mapper.map(key, GuestId.class));
	}

	@Override
	public List<GuestResponseDTO> getGuestResponseByQuizId(QuizDTO quizByQuizId) {
		return guestResponseRepository.findByKeyQuiz(mapper.map(quizByQuizId, Quiz.class)).stream()
				.map(this::mapGuestResponseToDTO).collect(Collectors.toList());
	}

	@Override
	public void checkGuestnameValidity(GuestIdDTO key) {
		Quiz quiz = quizRepositiry.findById(key.getQuizId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid quiz id!"));
	
		if (guestResponseRepository.existsById(new GuestId(quiz, key.getUsername()))) {
			throw new ApiException("Username already exists!!");
		}

	}
}
