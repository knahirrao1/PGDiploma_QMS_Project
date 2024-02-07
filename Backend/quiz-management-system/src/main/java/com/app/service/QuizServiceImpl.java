package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.QuizDao;

@Service
@Transactional
public class QuizServiceImpl implements QuizService {
	@Autowired
	private QuizDao dao;
}
