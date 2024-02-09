package com.app.service;

import java.util.List;

import com.app.entities.GuestEntity;
import com.app.entities.GuestResponse;

public interface GuestResponseService {

	GuestResponse saveGuestResponse(GuestResponse guestResponse);

	GuestResponse getGuestResponseById(GuestEntity key);

	List<GuestResponse> getAllGuestResponses();

	GuestResponse updateGuestResponse(GuestEntity key, GuestResponse updatedResponse);

	void deleteGuestResponse(GuestEntity key);

}
