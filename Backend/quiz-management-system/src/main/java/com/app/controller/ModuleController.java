package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.ModuleDTO;
import com.app.entities.Module;
import com.app.service.ModuleService;

@RestController
@RequestMapping("/modules")
//@CrossOrigin(origins = "http://localhost:3000")
public class ModuleController {
	@Autowired
	private ModuleService moduleService;

	@GetMapping
	public ResponseEntity<?> getAllModules() {
		try {
			List<Module> modules = moduleService.getAllModules();
			return new ResponseEntity<>(modules, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in Module controller get all modules method " + e);
			// return err mesg wrapped in DTO : ApiResp
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//--------------------------------------------------------------------------------------------------------------------------	
	@GetMapping("/{moduleId}")
	public ResponseEntity<?> getModuleById(@PathVariable Long id) {
		try {
			Module module = moduleService.getModuleById(id);
			return new ResponseEntity<>(module, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in module controller " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//--------------------------------------------------------------------------------------------------------------------------
	@PostMapping
	public ResponseEntity<?> createModule(@RequestBody ModuleDTO module) {
		// System.out.println("in create module");
		String moduleName = module.getTitle();
		String description = module.getDescription();
		if (moduleName.isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return ResponseEntity.status(HttpStatus.CREATED).body(moduleService.createModule(moduleName, description));
	}

//--------------------------------------------------------------------------------------------------------------------------

	@PutMapping("/{moduleId}")
	public ResponseEntity<?> updateModule(@PathVariable Long moduleId, @RequestBody ModuleDTO module) {

		Module oldModule = moduleService.getModuleById(moduleId);
		if (oldModule == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Invalid module Id"));
		}
		String moduleName = module.getTitle();
		String moduleDescription = module.getDescription();
		Module updatedModule = moduleService.updateModule(moduleId, moduleName, moduleDescription);
		return new ResponseEntity<>(updatedModule, HttpStatus.OK);
	}
	
//---------------------------------------------------------------------------------------------------------------------------   

	@DeleteMapping("/{moduleId}")
	public ResponseEntity<?> deleteModule(@PathVariable Long moduleId) {
        try {
		moduleService.deleteModule(moduleId);
        return ResponseEntity.status(HttpStatus.OK).build();
        }catch(RuntimeException e) {
        	System.out.println("Error in module controller delete method " + e);
			// return err mesg wrapped in DTO : ApiResp
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
        }
        }
}
