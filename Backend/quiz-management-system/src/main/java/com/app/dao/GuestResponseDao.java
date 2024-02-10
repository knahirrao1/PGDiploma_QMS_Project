package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.GuestId;
import com.app.entities.GuestResponse;
import com.app.entities.Quiz;

public interface GuestResponseDao extends JpaRepository<GuestResponse, GuestId> {

	List<GuestResponse> findByKeyQuiz(Quiz quiz);
	
}
