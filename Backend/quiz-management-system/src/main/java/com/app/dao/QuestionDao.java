package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Question;

public interface QuestionDao extends JpaRepository<Question, Long> {

}
