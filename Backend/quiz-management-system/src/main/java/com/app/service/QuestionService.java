package com.app.service;

import java.util.List;

import com.app.entities.Question;

public interface QuestionService {

	List<Question> getAllQuestionsByQuizId(Long quizId);

	Question getQuestionById(Long questionId);

	Question createQuestion(Long quizId, Question newQuestion);

	Question updateQuestion(Long questionId, Question updatedQuestion);

	void deleteQuestion(Long questionId);

	void deleteQuestionByQuiz(Long quizId);
}
