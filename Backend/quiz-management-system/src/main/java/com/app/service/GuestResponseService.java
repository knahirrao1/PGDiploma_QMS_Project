package com.app.service;

import java.util.List;

import com.app.entities.GuestId;
import com.app.entities.GuestResponse;
import com.app.entities.Quiz;

public interface GuestResponseService {

	GuestResponse saveGuestResponse(GuestResponse guestResponse);

	GuestResponse getGuestResponseById(GuestId key);

	List<GuestResponse> getAllGuestResponses();

	GuestResponse updateGuestResponse(GuestId key, GuestResponse updatedResponse);

	void deleteGuestResponse(GuestId key);

	List<GuestResponse> getGuestResponseByQuizId(Quiz quizByQuizId);

}
