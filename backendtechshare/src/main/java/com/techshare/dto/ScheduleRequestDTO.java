package com.techshare.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.techshare.entities.ScheduleType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleRequestDTO {

    private String title;
    private String description;

    private LocalDate date;
    @Schema(example = "10:00")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;

    @Schema(example = "11:30")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;

    private ScheduleType type;

    private Long instituteId;
    private Long courseId;
}
