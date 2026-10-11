package com.techshare.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "announcement ")
@Getter
@Setter
@ToString(callSuper = true)
public class Announcement extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    //Institute who posted the announcement
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institute_id", nullable = false)
    private Institute institute;

    //Course for which announcement is posted
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Enumerated(EnumType.STRING)
    private AnnouncementStatus status = AnnouncementStatus.ACTIVE;

    private LocalDateTime publishedAt = LocalDateTime.now();
}
