package com.app.service;

import java.util.List;

import com.app.dto.ModuleDTO;

public interface ModuleService {

	List<ModuleDTO> getAllModules();

	ModuleDTO getModuleById(Long moduleId);

	ModuleDTO createModule(String moduleName, String description);

	ModuleDTO updateModule(Long moduleId, String moduleName, String description);

	void deleteModule(Long moduleId);

	List<ModuleDTO> getModuleByUsername(String username);

	void deleteModuleByUsername(String username);

}
