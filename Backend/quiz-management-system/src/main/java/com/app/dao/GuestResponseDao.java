package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.GuestEntity;
import com.app.entities.GuestResponse;

public interface GuestResponseDao extends JpaRepository<GuestResponse, GuestEntity> {

}
