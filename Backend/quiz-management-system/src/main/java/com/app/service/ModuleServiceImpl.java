package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ModuleDao;

@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {
	@Autowired
	private ModuleDao dao;
}
