package com.techshare.service;

import java.util.List;

import com.techshare.dto.AnnouncementRequestDTO;
import com.techshare.dto.AnnouncementResponseDTO;

public interface AnnouncementService {

    AnnouncementResponseDTO createAnnouncement(AnnouncementRequestDTO dto);

    AnnouncementResponseDTO updateAnnouncement(Long announcementId, AnnouncementRequestDTO dto);

    void deleteAnnouncement(Long announcementId);

    List<AnnouncementResponseDTO> getAnnouncementsByCourse(Long courseId);

    List<AnnouncementResponseDTO> getAnnouncementsByInstitute(Long instituteId);
}
