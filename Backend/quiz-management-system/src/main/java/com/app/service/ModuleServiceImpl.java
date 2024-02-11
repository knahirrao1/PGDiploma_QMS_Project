package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.ModuleDao;
import com.app.dao.QuizDao;
import com.app.dao.UserDao;
import com.app.dto.ModuleDTO;
import com.app.entities.Module;
import com.app.entities.User;

@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {
	@Autowired
	private ModuleDao moduleRepository;

	@Autowired
	private QuizDao quizRepository;

	@Autowired
	private UserDao userRepository;

	@Autowired
	private ModelMapper mapper;

	@Override
	public List<ModuleDTO> getAllModules() {
		return moduleRepository.findAll().stream().map(module -> mapper.map(module, ModuleDTO.class))
				.collect(Collectors.toList());
	}

//----------------------------------------------------------------------------------------------------------------------
	@Override
	public ModuleDTO getModuleById(Long moduleId) {
		Module module = moduleRepository.findById(moduleId)
				.orElseThrow(() -> new ResourceNotFoundException("Module with this id does not exist!"));
		return mapper.map(module, ModuleDTO.class);
	}

//----------------------------------------------------------------------------------------------------------------------		
	@Override
	public List<ModuleDTO> getModuleByUsername(String username) {
		User user = userRepository.findById(username)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Username!"));
		return moduleRepository.findByUser(user).stream().map(module -> mapper.map(module, ModuleDTO.class))
				.collect(Collectors.toList());
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public ModuleDTO createModule(String moduleName, String description, String username) {
		User user = userRepository.findById(username)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Username!"));
		com.app.entities.Module module = new com.app.entities.Module();
		module.setTitle(moduleName);
		module.setDescription(description);
		module.setNumberOfQuizzes(0); // Default value
		module.setCreatedAt(LocalDate.now());
		module.setUser(user);
		Module createdModule = moduleRepository.save(module);
		return mapper.map(createdModule, ModuleDTO.class);
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public ModuleDTO updateModule(Long moduleId, String moduleName, String description) {
		com.app.entities.Module module = moduleRepository.findById(moduleId)
				.orElseThrow(() -> new ResourceNotFoundException("Module with this id does not exist!"));

		module.setTitle(moduleName);
		module.setDescription(description);
		Module updatedModule = moduleRepository.save(module);
		return mapper.map(updatedModule, ModuleDTO.class);
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

//--------------------------------------------------------------------------------------------------------------------------
	@Override
	public void deleteModuleByUsername(String username) {
		List<Module> modules = getModuleByUsername(username).stream().map(module -> mapper.map(module, Module.class))
				.collect(Collectors.toList());

		// here add code to delete all quizzes of that module before deleting the module

		moduleRepository.deleteAll(modules);
	}
}
