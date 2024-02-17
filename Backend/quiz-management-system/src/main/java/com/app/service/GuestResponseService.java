package com.app.service;

import java.util.List;

import com.app.dto.GuestIdDTO;
import com.app.dto.GuestResponseDTO;
import com.app.dto.QuizDTO;

public interface GuestResponseService {

	GuestResponseDTO saveGuestResponse(GuestResponseDTO guestResponse);

	GuestResponseDTO getGuestResponseById(Long quizId,String username);

	void deleteGuestResponse(GuestIdDTO key);

	List<GuestResponseDTO> getGuestResponseByQuizId(QuizDTO quizByQuizId);
	
	void checkGuestnameValidity(GuestIdDTO key);

}
