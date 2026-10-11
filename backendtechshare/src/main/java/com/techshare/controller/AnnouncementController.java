package com.techshare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.techshare.dto.AnnouncementRequestDTO;
import com.techshare.dto.AnnouncementResponseDTO;
import com.techshare.service.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/institute/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @PostMapping("/add")
    public ResponseEntity<AnnouncementResponseDTO> create(
            @RequestBody AnnouncementRequestDTO dto) {

        return ResponseEntity.ok(announcementService.createAnnouncement(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AnnouncementResponseDTO> update(
            @PathVariable Long id,
            @RequestBody AnnouncementRequestDTO dto) {

        return ResponseEntity.ok(
                announcementService.updateAnnouncement(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        announcementService.deleteAnnouncement(id);
        return ResponseEntity.ok("Announcement deleted successfully");
    }

    @GetMapping("/institute/{instituteId}")
    public ResponseEntity<List<AnnouncementResponseDTO>> getByInstitute(
            @PathVariable Long instituteId) {

        return ResponseEntity.ok(
                announcementService.getAnnouncementsByInstitute(instituteId));
    }
}
