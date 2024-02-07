package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ResponseDao;

@Service
@Transactional
public class ResponseServiceImpl implements ResponseService {
	@Autowired
	private ResponseDao dao;
}
