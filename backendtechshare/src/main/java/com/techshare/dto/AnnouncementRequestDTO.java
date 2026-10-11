package com.techshare.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnnouncementRequestDTO {

    private String title;
    private String message;
    private Long instituteId;
    private Long courseId;
}
