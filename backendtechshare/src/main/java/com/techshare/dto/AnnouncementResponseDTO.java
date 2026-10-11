package com.techshare.dto;

import java.time.LocalDateTime;

import com.techshare.entities.AnnouncementStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnnouncementResponseDTO {

    private Long id;
    private String title;
    private String message;

    private Long instituteId;
    private Long courseId;

    private AnnouncementStatus status;
    private LocalDateTime publishedAt;
}
