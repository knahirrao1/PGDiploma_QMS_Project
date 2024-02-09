package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Quiz;
import com.app.entities.Response;
import com.app.entities.User;

public interface ResponseDao extends JpaRepository<Response, Long> {

	List<Response> findByUser(User user);
	
	List<Response> findByQuiz(Quiz quiz);
}
