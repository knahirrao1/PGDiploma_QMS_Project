package com.app.service;

import java.util.List;

import com.app.dto.QuestionDTO;

public interface QuestionService {

	List<QuestionDTO> getAllQuestionsByQuizId(Long quizId);

	QuestionDTO getQuestionById(Long questionId);

	QuestionDTO createQuestion(Long quizId, QuestionDTO newQuestion);

	QuestionDTO updateQuestion(Long questionId, QuestionDTO updatedQuestion);

}
