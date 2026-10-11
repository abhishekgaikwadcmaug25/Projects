package com.techshare.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "institute")
@Getter
@Setter
@ToString(callSuper = true)
public class Institute extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "institute_name", nullable = false)
    private String instituteName;

    @Enumerated(EnumType.STRING)
    @Column(name = "institute_type", nullable = false)
    private InstituteType instituteType;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(columnDefinition = "TEXT")
    private String address;


    @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Announcement> announcements;

    @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Assignment> assignments;


    @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Course> courses;

}
