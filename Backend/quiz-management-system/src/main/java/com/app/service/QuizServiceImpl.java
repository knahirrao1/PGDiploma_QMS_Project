package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.QuestionDao;
import com.app.dao.QuizDao;
import com.app.entities.Quiz;

@Service
@Transactional
public class QuizServiceImpl implements QuizService {
	@Autowired
	private QuizDao quizRepository;
	
	@Autowired
	private QuestionDao questionRepository;
	
	@Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
	
	@Override
    public List<Quiz> getQuizzesByModuleId(Long moduleId) {
        return quizRepository.findByModuleId(moduleId);
    }
	
	@Override
    public Quiz createQuiz(Quiz quiz) {
        // Perform any necessary validation or business logic
        // For simplicity, you can directly save the quiz to the repository
        return quizRepository.save(quiz);
    }
	
	@Override
	public Quiz updateQuiz(Long quizId, Quiz updatedQuiz) {
        // Check if the quiz with the given id exists
        Optional<Quiz> existingQuizOptional = quizRepository.findById(quizId);

        if (existingQuizOptional.isPresent()) {
            // Update the existing quiz with the new data
            Quiz existingQuiz = existingQuizOptional.get();
            existingQuiz.setTitle(updatedQuiz.getTitle());
            existingQuiz.setModule(updatedQuiz.getModule());
            // Update other quiz properties as needed

            // Save the updated quiz to the repository
            return quizRepository.save(existingQuiz);
        } else {
            // Quiz with the given id not found
            throw new ResourceNotFoundException("Quiz with id " + quizId + " not found");
        }
    }

	@Override
    public void deleteQuiz(Long quizId) {		
        // Delete associated questions
        questionRepository.deleteByQuizId(quizId);
        
        // Delete the quiz
        quizRepository.deleteById(quizId);
    }

	@Override
	public Quiz getQuizByQuizId(Long quizId) {
		return quizRepository.findById(quizId)
				.orElseThrow(() -> new ResourceNotFoundException("no quiz by following quizid: " + quizId));
	}

}
