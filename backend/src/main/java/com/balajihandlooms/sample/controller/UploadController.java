package com.balajihandlooms.sample.controller;

import com.balajihandlooms.sample.service.CloudinaryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin
public class UploadController {

    private final CloudinaryService cloudinaryService;

    public UploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/images")
    public List<String> uploadImages(@RequestParam("files") List<MultipartFile> files) {

        return files.stream()
                .map(cloudinaryService::uploadFile)
                .collect(Collectors.toList());
    }
}