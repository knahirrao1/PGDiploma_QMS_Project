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
import com.app.dao.UserDao;
import com.app.dto.ModuleDTO;
import com.app.entities.Module;
import com.app.entities.User;

@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {
	private static final Logger logger = LogManager.getLogger(ModuleServiceImpl.class);
	
	@Autowired
	private ModuleDao moduleRepository;

	@Autowired
	private UserDao userRepository;

	@Autowired
	private ModelMapper mapper;
	
    private ModuleDTO mapModuleToDTO(Module module) {
        ModuleDTO moduleDTO = mapper.map(module, ModuleDTO.class);
        moduleDTO.setUsername(module.getUser().getUsername());
        logger.info("Module details"+moduleDTO.toString());
        return moduleDTO;
    }

	@Override
	public List<ModuleDTO> getAllModules() {
		return moduleRepository.findAll().stream().map(this::mapModuleToDTO)
				.collect(Collectors.toList());
	}

//----------------------------------------------------------------------------------------------------------------------
	@Override
	public ModuleDTO getModuleById(Long moduleId) {
		Module module = moduleRepository.findById(moduleId)
				.orElseThrow(() -> new ResourceNotFoundException("Module with this id does not exist!"));
		return mapModuleToDTO(module);
	}

//----------------------------------------------------------------------------------------------------------------------		
	@Override
	public List<ModuleDTO> getModuleByUsername(String username) {
		User user = userRepository.findById(username)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Username!"));
		return moduleRepository.findByUser(user).stream().map(this::mapModuleToDTO)
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
		return mapModuleToDTO(createdModule);
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public ModuleDTO updateModule(Long moduleId, String moduleName, String description) {
		com.app.entities.Module module = moduleRepository.findById(moduleId)
				.orElseThrow(() -> new ResourceNotFoundException("Module with this id does not exist!"));

		module.setTitle(moduleName);
		module.setDescription(description);
		Module updatedModule = moduleRepository.save(module);
		return mapModuleToDTO(updatedModule);
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Transactional
	@Override
	public void deleteModule(Long moduleId) {
		Module module = moduleRepository.findById(moduleId)
				.orElseThrow(() -> new ResourceNotFoundException("Module with this id does not exist!"));
		moduleRepository.delete(module);
	}

}
