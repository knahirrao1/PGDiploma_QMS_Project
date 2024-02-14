package com.app.service;

import java.util.List;

import com.app.dto.ResponseDTO;

public interface ResponseService {

	List<ResponseDTO> getAllResponses();

	ResponseDTO getResponseById(Long id);

	ResponseDTO saveResponse(ResponseDTO response);

	void deleteResponse(Long id);

	List<ResponseDTO> getResponseByUsername(String username);

	List<ResponseDTO> getResponseByQuizId(Long quizId);

}
