package com.app.service;

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
	private ModuleDao moduleDao;
	private QuizDao quizDao;

	
	
	@Override
	public List<com.app.entities.Module> getAllModules() {
		return moduleDao.findAll();
	}
//----------------------------------------------------------------------------------------------------------------------
	@Override
	public com.app.entities.Module getModuleById(Long moduleId) {
		return moduleDao.findById(moduleId).orElse(null);
	}

//----------------------------------------------------------------------------------------------------------------------		
	@Override
	public com.app.entities.Module createModule(String moduleName, String description) {
		com.app.entities.Module module = new com.app.entities.Module();
		module.setTitle(moduleName);
		module.setDescription(description);
		module.setNumberOfQuizzes(0); // Default value
		return moduleDao.save(module);
	}

//----------------------------------------------------------------------------------------------------------------------	
	@Override
	public com.app.entities.Module updateModule(Long moduleId, String moduleName, String description) {
		Optional<com.app.entities.Module> optionalModule = moduleDao.findById(moduleId);
		if (optionalModule.isPresent()) {
			com.app.entities.Module module = optionalModule.get();
			module.setTitle(moduleName);
			module.setDescription(description);
			return moduleDao.save(module);
		}
		return null; // Module not found
	}
	
	
//----------------------------------------------------------------------------------------------------------------------	
	 	@Transactional
	 	@Override
	    public void deleteModule(Long moduleId) {
	        Module module = moduleDao.findById(moduleId).orElse(null);
	        	   
	        if (module != null) {
	            // Delete associated quizzes
	            //List<Quiz> quizzes = module.getQuizzes();
	            //if (quizzes != null) {
	            //quizRepository.deleteAll(quizzes);
	            quizDao.deleteByModule(module);
	            //}
	            // Delete the module
	            moduleDao.delete(module);
	        }
	        else throw new ResourceNotFoundException("Module with this id does not exist!");
	    }
}
