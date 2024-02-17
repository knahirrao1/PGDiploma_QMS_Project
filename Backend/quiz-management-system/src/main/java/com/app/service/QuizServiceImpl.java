package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.ModuleDao;
import com.app.dao.QuizDao;
import com.app.dto.QuizDTO;
import com.app.entities.Module;
import com.app.entities.Quiz;

@Service
@Transactional
public class QuizServiceImpl implements QuizService {
	private static final Logger logger = LogManager.getLogger(ModuleServiceImpl.class);
	
	@Autowired
	private QuizDao quizRepository;

	@Autowired
	private ModuleDao moduleRepository;

	@Autowired
	private ModelMapper mapper;
	
    private QuizDTO mapQuizToDTO(Quiz quiz) {
        QuizDTO quizDTO = mapper.map(quiz, QuizDTO.class);
        quizDTO.setModuleId(quiz.getModule().getId());
        logger.info("quiz details"+quizDTO.toString());
        return quizDTO;
    }

	@Override
	public List<QuizDTO> getAllQuizzes() {
		return quizRepository.findAll().stream().map(this::mapQuizToDTO).collect(Collectors.toList());
	}

	@Override
	public List<QuizDTO> getQuizzesByModuleId(Long moduleId) {
		return quizRepository.findByModuleId(moduleId).stream().map(this::mapQuizToDTO)
				.collect(Collectors.toList());
	}

	@Override
	public QuizDTO createQuiz(QuizDTO quiz) {
		Module module = moduleRepository.findById(quiz.getModuleId())
				.orElseThrow(() -> new ResourceNotFoundException("Module with this id does not exist!"));
		Quiz q = mapper.map(quiz, Quiz.class);
		q.setCreatedAt(LocalDate.now());
		q.setModule(module);
		module.setNumberOfQuizzes(module.getNumberOfQuizzes()+1);
		return mapQuizToDTO(quizRepository.save(q));
	}

	@Override
	public QuizDTO updateQuiz(Long quizId, QuizDTO updatedQuiz) {
		// Check if the quiz with the given id exists
		Quiz existingQuiz = quizRepository.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid quiz id"));
		// Update the existing quiz with the new data
		existingQuiz.setTitle(updatedQuiz.getTitle());
		existingQuiz.setModule(moduleRepository.findById(updatedQuiz.getModuleId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid module id")));
		// Update other quiz properties as needed
		// Save the updated quiz to the repository
		return mapQuizToDTO(quizRepository.save(existingQuiz));
	}

	@Override
	public void deleteQuiz(Long quizId) {
		Quiz quiz = quizRepository.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("Quiz with this id does not exist!"));
		// Delete the quiz
		quizRepository.delete(quiz);
	}

	@Override
	public QuizDTO getQuizByQuizId(Long quizId) {
		Quiz quiz = quizRepository.findById(quizId).orElseThrow(
				() -> new ResourceNotFoundException("no quiz by following quizid: " + quizId));
		return mapQuizToDTO(quiz);
	}

}
