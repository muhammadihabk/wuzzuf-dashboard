package com.example.wuzzufdashboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.wuzzufdashboard.model.EntityJob;

@Repository
public interface EntityJobRepository extends CrudRepository<EntityJob, Long> {
    List<EntityJob> findByCompany(String company);

    @Query(value = """
        SELECT *
        FROM job
        WHERE LCASE(skills) LIKE LCASE(CONCAT(:skill, '%'))
            OR LCASE(skills) LIKE LCASE(CONCAT('%', ' ', :skill, '%'))
            OR LCASE(skills) LIKE LCASE(CONCAT('%', :skill))
        """
            , nativeQuery = true)
    List<EntityJob> findBySkill(@Param(value = "skill") String skill);
}
