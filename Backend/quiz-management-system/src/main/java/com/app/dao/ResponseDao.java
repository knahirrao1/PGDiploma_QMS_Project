package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Response;

public interface ResponseDao extends JpaRepository<Response, Long> {

}
