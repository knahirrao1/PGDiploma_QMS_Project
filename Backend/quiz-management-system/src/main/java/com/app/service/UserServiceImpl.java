package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.UserDao;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao dao;
}
