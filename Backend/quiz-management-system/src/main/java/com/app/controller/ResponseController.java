package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Response;
import com.app.service.ResponseService;

@RestController
public class ResponseController {
	@Autowired
	private ResponseService responseService;
	
	@GetMapping
    public List<Response> getAllResponses() {
        return responseService.getAllResponses();
    }

    @GetMapping("/{id}")
    public Response getResponseById(@PathVariable Long id) {
        return responseService.getResponseById(id);
    }

    @PostMapping
    public Response saveResponse(@RequestBody Response response) {
        return responseService.saveResponse(response);
    }

    @DeleteMapping("/{id}")
    public void deleteResponse(@PathVariable Long id) {
        responseService.deleteResponse(id);
    }
}
