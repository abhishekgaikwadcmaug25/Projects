package com.techshare.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.techshare.custom_exception.ApiException;
import com.techshare.dto.ScheduleRequestDTO;
import com.techshare.dto.ScheduleResponseDTO;
import com.techshare.entities.Course;
import com.techshare.entities.Institute;
import com.techshare.entities.Schedule;
import com.techshare.repositories.CourseRepository;
import com.techshare.repositories.InstituteRepository;
import com.techshare.repositories.ScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final InstituteRepository instituteRepository;
    private final CourseRepository courseRepository;

    // ✅ CREATE
    @Override
    public ScheduleResponseDTO createSchedule(ScheduleRequestDTO dto) {

        if (dto.getInstituteId() == null || dto.getCourseId() == null) {
            throw new ApiException("InstituteId and CourseId must not be null");
        }

        Institute institute = instituteRepository.findById(dto.getInstituteId())
                .orElseThrow(() -> new ApiException("Institute not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new ApiException("Course not found"));

        Schedule schedule = new Schedule();
        schedule.setTitle(dto.getTitle());
        schedule.setDescription(dto.getDescription());
        schedule.setDate(dto.getDate());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());
        schedule.setType(dto.getType());
        schedule.setInstitute(institute);
        schedule.setCourse(course);

        return mapToDTO(scheduleRepository.save(schedule));
    }

    // ✅ UPDATE
    @Override
    public ScheduleResponseDTO updateSchedule(Long scheduleId, ScheduleRequestDTO dto) {

        if (scheduleId == null) {
            throw new ApiException("ScheduleId must not be null");
        }

        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ApiException("Schedule not found"));

        if (dto.getTitle() != null)
            schedule.setTitle(dto.getTitle());

        if (dto.getDescription() != null)
            schedule.setDescription(dto.getDescription());

        if (dto.getDate() != null)
            schedule.setDate(dto.getDate());

        if (dto.getStartTime() != null)
            schedule.setStartTime(dto.getStartTime());

        if (dto.getEndTime() != null)
            schedule.setEndTime(dto.getEndTime());

        if (dto.getType() != null)
            schedule.setType(dto.getType());

        if (dto.getCourseId() != null) {
            Course course = courseRepository.findById(dto.getCourseId())
                    .orElseThrow(() -> new ApiException("Course not found"));
            schedule.setCourse(course);
        }

        return mapToDTO(scheduleRepository.save(schedule));
    }

    // ✅ DELETE
    @Override
    public void deleteSchedule(Long scheduleId) {

        if (scheduleId == null) {
            throw new ApiException("ScheduleId must not be null");
        }

        if (!scheduleRepository.existsById(scheduleId)) {
            throw new ApiException("Schedule not found");
        }

        scheduleRepository.deleteById(scheduleId);
    }

    // ✅ STUDENT VIEW (COURSE)
    @Override
    public List<ScheduleResponseDTO> getSchedulesByCourse(Long courseId) {

        if (courseId == null) {
            throw new ApiException("CourseId must not be null");
        }

        return scheduleRepository.findByCourse_Id(courseId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ✅ STUDENT VIEW (COURSE + DATE)
    @Override
    public List<ScheduleResponseDTO> getSchedulesByCourseAndDate(Long courseId, LocalDate date) {

        if (courseId == null || date == null) {
            throw new ApiException("CourseId and Date must not be null");
        }

        return scheduleRepository.findByCourse_IdAndDate(courseId, date)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ✅ INSTITUTE VIEW
    @Override
    public List<ScheduleResponseDTO> getSchedulesByInstitute(Long instituteId) {

        if (instituteId == null) {
            throw new ApiException("InstituteId must not be null");
        }

        return scheduleRepository.findByInstitute_Id(instituteId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ✅ STUDENT VIEW (INSTITUTE + COURSE)
    @Override
    public List<ScheduleResponseDTO> getSchedulesForStudent(Long instituteId, Long courseId) {

        if (instituteId == null || courseId == null) {
            throw new ApiException("InstituteId and CourseId must not be null");
        }

        return scheduleRepository
                .findByInstitute_IdAndCourse_Id(instituteId, courseId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ✅ MAPPER
    private ScheduleResponseDTO mapToDTO(Schedule schedule) {

        ScheduleResponseDTO dto = new ScheduleResponseDTO();
        dto.setId(schedule.getId());
        dto.setTitle(schedule.getTitle());
        dto.setDescription(schedule.getDescription());
        dto.setDate(schedule.getDate());
        dto.setStartTime(schedule.getStartTime());
        dto.setEndTime(schedule.getEndTime());
        dto.setType(schedule.getType());
        dto.setInstituteId(schedule.getInstitute().getId());
        dto.setCourseId(schedule.getCourse().getId());

        return dto;
    }
}
