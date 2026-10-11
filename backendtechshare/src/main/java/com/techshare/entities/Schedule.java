package com.techshare.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Schedule extends BaseEntity {

	@Column(nullable = false)
    private String title;
    private String description;

    private LocalDate date;
    @Column(name="start_time")
    private LocalTime startTime;
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    private ScheduleType type;     // LECTURE, EXAM, EVENT/SESSION

    @ManyToOne
    @JoinColumn(name = "institute_id")
    private Institute institute;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
