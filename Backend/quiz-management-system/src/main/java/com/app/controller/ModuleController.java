package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.app.service.ModuleService;

@RestController
@RequestMapping("/modules")
@CrossOrigin(origins = "https://pg-diploma-qms-project.vercel.app/")
public class ModuleController {
	@Autowired
	private ModuleService moduleService;

	@GetMapping
	public ResponseEntity<?> getAllModules() {
		try {
			List<ModuleDTO> modules = moduleService.getAllModules();
			return new ResponseEntity<>(modules, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in Module controller get all modules method " + e);
			// return err mesg wrapped in DTO : ApiResp
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//--------------------------------------------------------------------------------------------------------------------------	
	@GetMapping("/{moduleId}")
	public ResponseEntity<?> getModuleById(@PathVariable Long moduleId) {
		try {
			ModuleDTO module = moduleService.getModuleById(moduleId);
			return new ResponseEntity<>(module, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in module controller get module by id method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//--------------------------------------------------------------------------------------------------------------------------
	@GetMapping("/users/{username}")
	public ResponseEntity<?> getModuleByUsername(@PathVariable String username) {
		try {
			List<ModuleDTO> modules = moduleService.getModuleByUsername(username);
			return new ResponseEntity<>(modules, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in module controller get module by username method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}
//--------------------------------------------------------------------------------------------------------------------------	

	@PostMapping
	public ResponseEntity<?> createModule(@RequestBody ModuleDTO module) {
		// System.out.println("in create module");
		try {
			String moduleName = module.getTitle();
			String description = module.getDescription();
			String username = module.getUsername();
			if (moduleName.isEmpty())
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(moduleService.createModule(moduleName, description, username));
		} catch (RuntimeException e) {
			System.out.println("Error in module controller create module method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//--------------------------------------------------------------------------------------------------------------------------
	@PutMapping("/{moduleId}")
	public ResponseEntity<?> updateModule(@PathVariable Long moduleId, @RequestBody ModuleDTO module) {
		try {
			ModuleDTO oldModule = moduleService.getModuleById(moduleId);
			if (oldModule == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Invalid module Id"));
			}
			String moduleName = module.getTitle();
			String moduleDescription = module.getDescription();
			ModuleDTO updatedModule = moduleService.updateModule(moduleId, moduleName, moduleDescription);
			return new ResponseEntity<>(updatedModule, HttpStatus.OK);
		} catch (RuntimeException e) {
			System.out.println("Error in module controller update module method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

//---------------------------------------------------------------------------------------------------------------------------   
	@DeleteMapping("/{moduleId}")
	public ResponseEntity<?> deleteModule(@PathVariable Long moduleId) {
		try {
			moduleService.deleteModule(moduleId);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (RuntimeException e) {
			System.out.println("Error in module controller delete module method " + e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

}
