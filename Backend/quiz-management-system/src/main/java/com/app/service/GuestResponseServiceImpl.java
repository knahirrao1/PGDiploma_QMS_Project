package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	@Autowired
	private GuestResponseDao guestResponseRepository;

	@Autowired
	private QuizDao quizRepositiry;

	@Autowired
	private ModelMapper mapper;

	@Override
	public GuestResponseDTO saveGuestResponse(GuestResponseDTO guestResponse) {
		GuestResponse guest = mapper.map(guestResponse, GuestResponse.class);
		return mapper.map(guestResponseRepository.save(guest), GuestResponseDTO.class);
	}
//------------------------------------------------------------------------------------------------------------------

	@Override
	public GuestResponseDTO getGuestResponseById(Long quizId, String username) {
		GuestResponse response = guestResponseRepository
				.findById(new GuestId(quizRepositiry.findById(quizId).orElseThrow(), username))
				.orElseThrow(() -> new ResourceNotFoundException("Invalid quizid and username combination"));
		return mapper.map(response, GuestResponseDTO.class);
	}

//------------------------------------------------------------------------------------------------------------------
	@Override
	public List<GuestResponseDTO> getAllGuestResponses() {
		return guestResponseRepository.findAll().stream().map(g -> mapper.map(g, GuestResponseDTO.class))
				.collect(Collectors.toList());
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
				.map(g -> mapper.map(g, GuestResponseDTO.class)).collect(Collectors.toList());
	}
}
