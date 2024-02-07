package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.GuestResponseService;

@RestController
public class GuestResponseControllerImpl implements GuestResponseController {
	@Autowired
	private GuestResponseService service;
}
