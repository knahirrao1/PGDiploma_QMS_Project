package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Module;
import com.app.entities.User;

public interface ModuleDao extends JpaRepository<com.app.entities.Module, Long> {

	List<Module> findByUser(User username);

}
