package com.app.service;

import java.util.List;

import com.app.entities.Quiz;

public interface QuizService {
	public List<Quiz> getAllQuizzes();

	List<Quiz> getQuizzesByModuleId(Long moduleId);

	Quiz createQuiz(Quiz quiz);

	Quiz updateQuiz(Long quizId, Quiz updatedQuiz);

	void deleteQuiz(Long quizId);

	Quiz getQuizByQuizId(Long quizId);
	
	
}
