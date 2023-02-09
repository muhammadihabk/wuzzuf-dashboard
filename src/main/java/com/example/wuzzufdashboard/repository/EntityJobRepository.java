package com.example.wuzzufdashboard.repository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.wuzzufdashboard.model.EntityJob;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@Repository
public class EntityJobRepository {
    private static final Logger log = LoggerFactory.getLogger(EntityJobRepository.class);
    private EntityManager entityManager;

    @Autowired
    public EntityJobRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<EntityJob> findJobsFiltered(int pageNum, String filter) {
        String queryScript = """
            SELECT *
            FROM job
            WHERE LCASE(skills) LIKE :filter
                OR LCASE(company) LIKE :filter
                OR LCASE(role) LIKE :filter
            LIMIT :pageSize
            OFFSET :pageNum 
        """;
        int pageSize = 12;
        try {
            Query query = entityManager.createNativeQuery(queryScript, EntityJob.class);
            query.setParameter("pageSize", pageSize);
            query.setParameter("pageNum", pageNum * 12);
            query.setParameter("filter", filter);
            return query.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
