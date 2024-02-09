package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.GuestEntity;
import com.app.entities.GuestResponse;
import com.app.service.GuestResponseService;

@RestController
public class GuestResponseController {
	@Autowired
	private GuestResponseService guestResponseService;

	
	//Pending - URL changes and new GuestEntity( ) constructor errors
	
	
	@PostMapping
	public GuestResponse createGuestResponse(@Valid @RequestBody GuestResponse guestResponse) {
		return guestResponseService.saveGuestResponse(guestResponse);
	}

	@GetMapping("/{quizId}/{username}")
	public GuestResponse getGuestResponse(@PathVariable Long quizId, @PathVariable String username) {
		// Assuming GuestEntity has appropriate constructors
		return guestResponseService.getGuestResponseById(new GuestEntity(quizId, username));
	}

	@PutMapping("/{quizId}/{username}")
	public GuestResponse updateGuestResponse(@PathVariable Long quizId, @PathVariable String username,
			@Valid @RequestBody GuestResponse updatedResponse) {
		// Assuming GuestEntity has appropriate constructors
		return guestResponseService.updateGuestResponse(new GuestEntity(quizId, username), updatedResponse);
	}

	@DeleteMapping("/{quizId}/{username}")
	public void deleteGuestResponse(@PathVariable Long quizId, @PathVariable String username) {
		// Assuming GuestEntity has appropriate constructors
		guestResponseService.deleteGuestResponse(new GuestEntity(quizId, username));
	}
}
