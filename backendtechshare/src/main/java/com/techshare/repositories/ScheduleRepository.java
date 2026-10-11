package com.techshare.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.techshare.entities.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByCourse_Id(Long courseId);

    List<Schedule> findByCourse_IdAndDate(Long courseId, LocalDate date);

    List<Schedule> findByInstitute_Id(Long instituteId);

    List<Schedule> findByInstitute_IdAndCourse_Id(Long instituteId, Long courseId);
}
