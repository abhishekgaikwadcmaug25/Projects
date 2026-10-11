package com.techshare.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.techshare.entities.Institute;

public interface InstituteRepository extends JpaRepository<Institute, Long> {
	boolean existsByInstituteName(String instituteName);

	Optional<Institute> findByUserEmail(String email);
}
