package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.QuestionDao;
import com.app.dao.QuizDao;
import com.app.dto.QuestionDTO;
import com.app.entities.Question;
import com.app.entities.Quiz;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {
	private static final Logger logger = LogManager.getLogger(ModuleServiceImpl.class);

	@Autowired
	private QuizDao quizRepository;

	@Autowired
	private QuestionDao questionRepository;

	@Autowired
	private ModelMapper mapper;
	
    private QuestionDTO mapQuestionToDTO(Question question) {
    	QuestionDTO questionDTO = mapper.map(question, QuestionDTO.class);
    	questionDTO.setQuizId(question.getQuiz().getId());
        logger.info("Question details"+questionDTO.toString());
        return questionDTO;
    }

	@Override
	public List<QuestionDTO> getAllQuestionsByQuizId(Long quizId) {
		// Check if the quiz with given id exists
		Quiz quiz = quizRepository.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz with given Id does not exist!"));
		return questionRepository.findByQuiz(quiz).stream().map(this::mapQuestionToDTO)
				.collect(Collectors.toList());
	}

//---------------------------------------------------------------------------------------------------------------
	@Override
	public QuestionDTO getQuestionById(Long questionId) {
		// Check if the question with the given id exists
		Question question = questionRepository.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found with this id"));
		return mapQuestionToDTO(question);
	}

//---------------------------------------------------------------------------------------------------------------
	@Override
	public QuestionDTO createQuestion(Long quizId, Question newQuestion) {
		// Check if the quiz with the given id exists
		Quiz quiz = quizRepository.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz not found with this id"));

		quiz.setNumberOfQuestions(quiz.getNumberOfQuestions() + 1);

		// Set the quiz for the new question
		newQuestion.setQuiz(quiz);

		// Save the new question
		Question question = questionRepository.save(newQuestion);
		return mapQuestionToDTO(question);
	}

//---------------------------------------------------------------------------------------------------------------	
	@Override
	public QuestionDTO updateQuestion(Long questionId, Question updatedQuestion) {
		// Check if the question with the given id exists
		Question existingQuestion = questionRepository.findById(questionId)
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
		Question question = questionRepository.save(existingQuestion);
		return mapQuestionToDTO(question);
	}

//---------------------------------------------------------------------------------------------------------------	
	@Override
	public void deleteQuestion(Long questionId) {
		// Check if the question with the given id exists
		Question existingQuestion = questionRepository.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found with this id"));

		// kunal code added
		Quiz quiz = quizRepository.findById(existingQuestion.getQuiz().getId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid quiz id"));

		quiz.setNumberOfQuestions(quiz.getNumberOfQuestions() - 1);
		// Delete the question
		questionRepository.delete(existingQuestion);
	}

//---------------------------------------------------------------------------------------------------------------	
	@Override
	public void deleteQuestionsByQuiz(Long quizId) {
		List<Question> questions = getAllQuestionsByQuizId(quizId).stream()
				.map(question -> mapper.map(question, Question.class)).collect(Collectors.toList());
		questionRepository.deleteAll(questions);
	}
}
