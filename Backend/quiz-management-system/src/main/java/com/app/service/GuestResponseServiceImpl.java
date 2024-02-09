package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.GuestResponseDao;
import com.app.entities.GuestEntity;
import com.app.entities.GuestResponse;

@Service
@Transactional
public class GuestResponseServiceImpl implements GuestResponseService {
	@Autowired
	private GuestResponseDao guestResponseDao;
	
	
	 @Override
	    public GuestResponse saveGuestResponse(GuestResponse guestResponse) {
	        // Add validation logic if needed
	        return guestResponseDao.save(guestResponse);
	    }
//------------------------------------------------------------------------------------------------------------------

	    @Override
	    public GuestResponse getGuestResponseById(GuestEntity key) {
	        return guestResponseDao.findById(key).orElse(null);
	    }

//------------------------------------------------------------------------------------------------------------------
	    @Override
	    public List<GuestResponse> getAllGuestResponses() {
	        return guestResponseDao.findAll();
	    }

//------------------------------------------------------------------------------------------------------------------
	    @Override
	    public GuestResponse updateGuestResponse(GuestEntity key, GuestResponse updatedResponse) {
	        // Add validation or additional logic if needed
	        GuestResponse existingResponse = getGuestResponseById(key);
	        if (existingResponse != null) {
	            // Update properties as needed
	            existingResponse.setScore(updatedResponse.getScore());
	            existingResponse.setCreatedAt(updatedResponse.getCreatedAt());
	            // Save the updated response
	            return guestResponseDao.save(existingResponse);
	        }
	        return null; // Or throw an exception indicating the resource was not found
	    }
//------------------------------------------------------------------------------------------------------------------
	    @Override
	    public void deleteGuestResponse(GuestEntity key) {
	        // Add validation or additional logic if needed
	        guestResponseDao.deleteById(key);
	    }
}
