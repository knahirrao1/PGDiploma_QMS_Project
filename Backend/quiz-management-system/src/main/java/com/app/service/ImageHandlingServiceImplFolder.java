//package com.app.service;
//
//import java.io.File;
//import java.io.IOException;
//
//import javax.annotation.PostConstruct;
//import javax.transaction.Transactional;
//
//import org.apache.commons.io.FileUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.app.custom_exceptions.ResourceNotFoundException;
//import com.app.dao.UserDao;
//import com.app.dto.ApiResponse;
//import com.app.entities.User;
//
//@Service("image_folder")
//@Transactional
//public class ImageHandlingServiceImplFolder implements ImageHandlingService {
//	@Autowired
//	private UserDao userRepository;
//
//	// to inject the value of the property , from app property file , using Field DI
//	// , using SpEL : Spring expr language
//	@Value("${folder.location}")
//	private String folderLocation;
//
//	@PostConstruct
//	public void init() {
//		System.out.println("in init " + folderLocation);
//		// chk if folder exists --yes --continue
//		File folder = new File(folderLocation);
//		if (folder.exists()) {
//			System.out.println("folder exists alrdy !");
//		} else {
//			// no --create a folder
//			folder.mkdir();
//			System.out.println("created a folder !");
//		}
//	}
//
//	@Override
//	public ApiResponse uploadImage(String username, MultipartFile image) throws IOException {
//		// get emp from emp id
//		User user = userRepository.findById(username).orElseThrow(() -> new ResourceNotFoundException("Invalid username!!!!"));
//		// emp found --> PERSISTENT
//		// store the image on server side folder
//		String path = folderLocation.concat(image.getOriginalFilename());
//		System.out.println(path);
//		// Use FileUtils method : writeByte[] --> File
//		FileUtils.writeByteArrayToFile(new File(path), image.getBytes());
//		// set image path
//		// OR to store the img directly in DB as a BLOB
//		// emp.setImage(image.getBytes());
//		return new ApiResponse("Image file uploaded successfully for emp id " + username);
//	}
//
//	@Override
//	public byte[] downloadImage(String username) throws IOException {
//		// get emp by id
//		User user = userRepository.findById(username).orElseThrow(() -> new ResourceNotFoundException("Invalid username!!!!"));
//		// emp found --> PERSISTENT
//		//String path = user.getImagePath();
////		if (path != null) {
////			// path ---> File --> byte[]
////			return FileUtils.readFileToByteArray(new File(path));
////			//OR from DB : return emp.getImage();
////		} else
////			throw new ApiException("Image not yet assigned !!!!");
//		return null;
//	}
//
//}
