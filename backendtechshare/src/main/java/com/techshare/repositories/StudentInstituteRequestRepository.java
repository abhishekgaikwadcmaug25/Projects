package com.techshare.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.techshare.entities.RequestStatus;
import com.techshare.entities.StudentInstituteRequest;

public interface StudentInstituteRequestRepository extends JpaRepository<StudentInstituteRequest, Long> {

	Optional<StudentInstituteRequest> findByStudentId(Long studentId);

	Optional<StudentInstituteRequest> findByStudent_User_EmailAndStatus(String email, RequestStatus status);

	boolean existsByStudent_User_EmailAndStatus(String email, RequestStatus status);

	List<StudentInstituteRequest> findByInstituteIdAndStatus(Long instituteId, RequestStatus status);

	List<StudentInstituteRequest> findByInstituteId(Long instituteId);


    @Query("""
        SELECT r FROM StudentInstituteRequest r
        JOIN FETCH r.student s
        JOIN FETCH s.user u
        WHERE r.institute.id = :instituteId
        AND r.status = :status
    """)
	List<StudentInstituteRequest> findRequestsWithStudentUser(
	        @Param("instituteId") Long instituteId,
	        @Param("status") RequestStatus status
	);
}
