package com.app.service;

import java.util.List;

import com.app.dto.QuestionDTO;
import com.app.entities.Question;

public interface QuestionService {

	List<QuestionDTO> getAllQuestionsByQuizId(Long quizId);

	QuestionDTO getQuestionById(Long questionId);

	QuestionDTO createQuestion(Long quizId, Question newQuestion);

	QuestionDTO updateQuestion(Long questionId, Question updatedQuestion);

	void deleteQuestion(Long questionId);

	void deleteQuestionsByQuiz(Long quizId);
}
