package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.UserService;

@RestController
public class UserControllerImpl implements UserController {
	@Autowired
	private UserService service;
}
