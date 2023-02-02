package com.example.wuzzufdashboard.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.wuzzufdashboard.model.EntityJob;

@Repository
public interface EntityJobRepository extends CrudRepository<EntityJob, Long> {
    List<EntityJob> findByCompany(String company);

    List<EntityJob> findBySkills(String skills);
}
