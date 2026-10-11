package com.techshare.service;

import java.time.LocalDate;
import java.util.List;

import com.techshare.dto.ScheduleRequestDTO;
import com.techshare.dto.ScheduleResponseDTO;

public interface ScheduleService {

    // Institute CRUD
    ScheduleResponseDTO createSchedule(ScheduleRequestDTO dto);

    ScheduleResponseDTO updateSchedule(Long scheduleId, ScheduleRequestDTO dto);

    void deleteSchedule(Long scheduleId);

    // Student View
    List<ScheduleResponseDTO> getSchedulesByCourse(Long courseId);

    List<ScheduleResponseDTO> getSchedulesByCourseAndDate(Long courseId, LocalDate date);

    List<ScheduleResponseDTO> getSchedulesByInstitute(Long instituteId);

    List<ScheduleResponseDTO> getSchedulesForStudent(Long instituteId, Long courseId);
}
