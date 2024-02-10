package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.ModuleDao;
import com.app.dao.QuizDao;
import com.app.entities.Module;

@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {
	@Autowired
	private ModuleDao moduleRepository;

	@Autowired
	private QuizDao quizRepository;

	@Override
	public List<com.app.entities.Module> getAllModules() {
		return moduleRepository.findAll();
	}

//----------------------------------------------------------------------------------------------------------------------
	@Override
	public com.app.entities.Module getModuleById(Long moduleId) {
		return moduleRepository.findById(moduleId).orElse(null);
	}

//----------------------------------------------------------------------------------------------------------------------		
	@Override
	public com.app.entities.Module createModule(String moduleName, String description) {
		com.app.entities.Module module = new com.app.entities.Module();
		module.setTitle(moduleName);
		module.setDescription(description);
		module.setNumberOfQuizzes(0); // Default value
		module.setCreatedAt(LocalDate.now());
		return moduleRepository.save(module);
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public com.app.entities.Module updateModule(Long moduleId, String moduleName, String description) {
		com.app.entities.Module module = moduleRepository.findById(moduleId)
				.orElseThrow(() -> new ResourceNotFoundException("Module with this id does not exist!"));
		
		module.setTitle(moduleName);
		module.setDescription(description);
		return moduleRepository.save(module);
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Transactional
	@Override
	public void deleteModule(Long moduleId) {
		Module module = moduleRepository.findById(moduleId)
				.orElseThrow(() -> new ResourceNotFoundException("Module with this id does not exist!"));

		quizRepository.deleteByModule(module);
		moduleRepository.delete(module);
	}
}
