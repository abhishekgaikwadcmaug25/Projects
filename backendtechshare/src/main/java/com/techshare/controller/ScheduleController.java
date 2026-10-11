package com.techshare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techshare.dto.ScheduleRequestDTO;
import com.techshare.dto.ScheduleResponseDTO;
import com.techshare.service.ScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/institute/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/create")
    public ResponseEntity<ScheduleResponseDTO> create(@RequestBody ScheduleRequestDTO dto) {
        return ResponseEntity.ok(scheduleService.createSchedule(dto));
    }

    @PutMapping("/update/{scheduleId}")
    public ResponseEntity<ScheduleResponseDTO> update(
            @PathVariable Long scheduleId,
            @RequestBody ScheduleRequestDTO dto) {

        return ResponseEntity.ok(scheduleService.updateSchedule(scheduleId, dto));
    }

    @DeleteMapping("/delete/{scheduleId}")
    public ResponseEntity<String> delete(@PathVariable Long scheduleId) {

        scheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.ok("Schedule Deleted Successfully");
    }

    @GetMapping("/schedule/view/{instituteId}/{courseId}")
    public ResponseEntity<List<ScheduleResponseDTO>> viewSchedules(
            @PathVariable Long instituteId,
            @PathVariable Long courseId) {
        return ResponseEntity.ok(
                scheduleService.getSchedulesForStudent(instituteId, courseId));
    }

    @GetMapping("/institute/{instituteId}")
    public ResponseEntity<List<ScheduleResponseDTO>> getSchedulesByInstitute(
            @PathVariable Long instituteId) {
        return ResponseEntity.ok(scheduleService.getSchedulesByInstitute(instituteId));
    }
}
