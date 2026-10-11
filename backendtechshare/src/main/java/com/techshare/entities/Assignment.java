package com.techshare.entities;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "assignment")
@Getter
@Setter
@ToString(callSuper = true)
public class Assignment extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "institute_id", nullable = false)
    private Institute institute;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "total_marks")
    private Integer totalMarks;

    @Column(name = "File_url")
    private String fileUrl;

   @Enumerated(EnumType.STRING)
    private AssignmentStatus status = AssignmentStatus.ACTIVE;

   @ManyToOne
   @JoinColumn(name = "course_id", nullable = false)
   private Course course;



}
