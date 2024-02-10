package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.QuestionDao;
import com.app.dao.QuizDao;
import com.app.entities.Question;
import com.app.entities.Quiz;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuizDao quizDao;

	@Autowired
	private QuestionDao questionDao;

	@Override
	public List<Question> getAllQuestionsByQuizId(Long quizId) {
		// Check if the quiz with given id exists
		Quiz quiz = quizDao.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz with given Id does not exist!"));
		return questionDao.findByQuiz(quiz);
	}

//---------------------------------------------------------------------------------------------------------------
	@Override
	public Question getQuestionById(Long questionId) {
		// Check if the question with the given id exists
		return questionDao.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found with this id"));
	}

//---------------------------------------------------------------------------------------------------------------
	@Override
	public Question createQuestion(Long quizId, Question newQuestion) {
		// Check if the quiz with the given id exists
		Quiz quiz = quizDao.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz not found with this id"));

		quiz.setNumberOfQuestions(quiz.getNumberOfQuestions() + 1);

		// Set the quiz for the new question
		newQuestion.setQuiz(quiz);

		// Save the new question
		return questionDao.save(newQuestion);
	}

//---------------------------------------------------------------------------------------------------------------	
	@Override
	public Question updateQuestion(Long questionId, Question updatedQuestion) {
		// Check if the question with the given id exists
		Question existingQuestion = questionDao.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found with this id"));

		// Update the existing question with the new information
		existingQuestion.setQuestion(updatedQuestion.getQuestion());
		existingQuestion.setOptionA(updatedQuestion.getOptionA());
		existingQuestion.setOptionB(updatedQuestion.getOptionB());
		existingQuestion.setOptionC(updatedQuestion.getOptionC());
		existingQuestion.setOptionD(updatedQuestion.getOptionD());
		existingQuestion.setCorrectOption(updatedQuestion.getCorrectOption());
		existingQuestion.setExplanation(updatedQuestion.getExplanation());
		// Save the updated question
		return questionDao.save(existingQuestion);
	}

//---------------------------------------------------------------------------------------------------------------	
	@Override
	public void deleteQuestion(Long questionId) {
		// Check if the question with the given id exists
		Question existingQuestion = questionDao.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found with this id"));

		// Delete the question
		questionDao.delete(existingQuestion);
	}
}
