package com.techshare.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.techshare.entities.ScheduleType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleResponseDTO {

	private Long id;
	private String title;
	private String description;

	private LocalDate date;
	private LocalTime startTime;
	private LocalTime endTime;

	private ScheduleType type;

	private Long instituteId;
	private Long courseId;
}
