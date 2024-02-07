package com.app.service;

import java.util.List;

import com.app.entities.Module;

public interface ModuleService {

	List<Module> getAllModules();

	Module getModuleById(Long moduleId);

	Module createModule(String moduleName, String description);

	Module updateModule(Long moduleId, String moduleName, String description);

	void deleteModule(Long moduleId);

}
