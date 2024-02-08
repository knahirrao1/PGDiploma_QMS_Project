package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Module;
import com.app.entities.Quiz;

public interface QuizDao extends JpaRepository<Quiz, Long> {

	void deleteByModule(Module module);

	List<Quiz> findByModuleId(Long moduleId);

}
