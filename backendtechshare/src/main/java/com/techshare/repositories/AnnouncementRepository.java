package com.techshare.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techshare.entities.Announcement;
import com.techshare.entities.AnnouncementStatus;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    List<Announcement> findByCourseIdAndStatus(Long courseId, AnnouncementStatus status);

    List<Announcement> findByInstituteId(Long instituteId);
}
