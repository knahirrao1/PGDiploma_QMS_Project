package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.GuestResponseDao;
import com.app.entities.GuestId;
import com.app.entities.GuestResponse;
import com.app.entities.Quiz;

@Service
@Transactional
public class GuestResponseServiceImpl implements GuestResponseService {
	@Autowired
	private GuestResponseDao guestResponseDao;

	@Override
	public GuestResponse saveGuestResponse(GuestResponse guestResponse) {
		return guestResponseDao.save(guestResponse);
	}
//------------------------------------------------------------------------------------------------------------------

	@Override
	public GuestResponse getGuestResponseById(GuestId key) {
		return guestResponseDao.findById(key)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid quizid and username combination"));
	}

//------------------------------------------------------------------------------------------------------------------
	@Override
	public List<GuestResponse> getAllGuestResponses() {
		return guestResponseDao.findAll();
	}

//------------------------------------------------------------------------------------------------------------------
	@Override
	public GuestResponse updateGuestResponse(GuestId key, GuestResponse updatedResponse) {
		// Add validation or additional logic if needed
		GuestResponse existingResponse = getGuestResponseById(key);
		if (existingResponse != null) {
			// Update properties as needed
			existingResponse.setScore(updatedResponse.getScore());
			existingResponse.setCreatedAt(updatedResponse.getCreatedAt());
			// Save the updated response
			return guestResponseDao.save(existingResponse);
		}
		return null; // Or throw an exception indicating the resource was not found
	}

//------------------------------------------------------------------------------------------------------------------
	@Override
	public void deleteGuestResponse(GuestId key) {
		// Add validation or additional logic if needed
		guestResponseDao.deleteById(key);
	}

	@Override
	public List<GuestResponse> getGuestResponseByQuizId(Quiz quizByQuizId) {
		// TODO Auto-generated method stub
		return guestResponseDao.findByKeyQuiz(quizByQuizId);
	}
}
