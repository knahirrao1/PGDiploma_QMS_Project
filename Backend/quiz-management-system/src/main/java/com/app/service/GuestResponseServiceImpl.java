package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.GuestResponseDao;

@Service
@Transactional
public class GuestResponseServiceImpl implements GuestResponseService {
	@Autowired
	private GuestResponseDao dao;
}
