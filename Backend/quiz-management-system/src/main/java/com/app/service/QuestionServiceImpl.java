package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.QuestionDao;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {
	@Autowired
	private QuestionDao dao;
}
