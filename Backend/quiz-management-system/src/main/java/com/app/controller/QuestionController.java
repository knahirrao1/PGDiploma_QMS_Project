package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.QuestionService;

@RestController
public class QuestionController {
	@Autowired
	private QuestionService service;
}
