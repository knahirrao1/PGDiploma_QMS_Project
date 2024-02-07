package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.ResponseService;

@RestController
public class ResponseControllerImpl implements ResponseController {
	@Autowired
	private ResponseService service;
}
