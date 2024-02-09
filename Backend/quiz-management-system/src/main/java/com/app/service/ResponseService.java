package com.app.service;

import java.util.List;

import com.app.entities.Response;

public interface ResponseService {

	List<Response> getAllResponses();

	Response getResponseById(Long id);

	Response saveResponse(Response response);

	void deleteResponse(Long id);

	List<Response> getResponseByUsername(String username);

	List<Response> getResponseByQuizId(Long quizId);

}
