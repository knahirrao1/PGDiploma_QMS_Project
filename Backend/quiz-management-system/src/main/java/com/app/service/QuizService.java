package com.app.service;

import java.util.List;

import com.app.dto.QuizDTO;

public interface QuizService {
	List<QuizDTO> getAllQuizzes();

	List<QuizDTO> getQuizzesByModuleId(Long moduleId);

	QuizDTO createQuiz(QuizDTO quiz);

	QuizDTO updateQuiz(Long quizId, QuizDTO updatedQuiz);

	void deleteQuiz(Long quizId);

	QuizDTO getQuizByQuizId(Long quizId);

}
