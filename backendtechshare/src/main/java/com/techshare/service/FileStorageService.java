package com.techshare.service;
import java.io.File;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    public String saveFile(MultipartFile file) {

        try {
            //  Create folder if not exists
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            //  Clean filename
            String fileName = System.currentTimeMillis() + "_" +
                    file.getOriginalFilename().replace(" ", "_");

            File destination = new File(uploadDir + fileName);

            //  Save file
            file.transferTo(destination);

            System.out.println("File saved at: " + destination.getAbsolutePath());

            return "/uploads/" + fileName;

        } catch (Exception e) {

            //  Print actual error
            e.printStackTrace();

            throw new RuntimeException("File Upload Failed: " + e.getMessage());
        }
    }

	public void deleteFile(String fileUrl) {
		try {
	        if (fileUrl == null) return;

	        // Remove "/uploads/"
	        String fileName = fileUrl.replace("/uploads/", "");

	        File file = new File(uploadDir + fileName);

	        if (file.exists()) {
	            file.delete();
	            System.out.println("Old file deleted: " + fileName);
	        }

	    } catch (Exception e) {
	        System.out.println("File delete failed: " + e.getMessage());
	    }
	}
}
