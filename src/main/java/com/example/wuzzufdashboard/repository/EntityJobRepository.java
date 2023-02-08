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

    public List<EntityJob> findJobsInPages(int pageNum) {
        String queryScript = """
            SELECT *
            FROM job
            LIMIT :pageSize
            OFFSET :pageNum 
        """;
        int pageSize = 12;
        try {
            Query query = entityManager.createNativeQuery(queryScript, EntityJob.class);
            query.setParameter("pageSize", pageSize);
            query.setParameter("pageNum", pageNum * pageSize);
            return query.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public List<EntityJob> findJobsFiltered(int pageNum, String filter) {
        String queryScript = """
            SELECT *
            FROM job
            WHERE REGEXP_INSTR(LCASE(role), :filter) != 0
                OR REGEXP_INSTR(LCASE(company), :filter) != 0
                OR REGEXP_INSTR(LCASE(skills), :filter) != 0
            LIMIT :pageSize
            OFFSET :pageNum 
        """;
        int pageSize = 12;
        filter = fixFilter(filter);
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

    public List<EntityJob> findJobsByCompany(int pageNum, String filter) {
        String queryScript = """
            SELECT *
            FROM job
            WHERE REGEXP_INSTR(LCASE(company), :filter) != 0
            LIMIT :pageSize
            OFFSET :pageNum 
        """;
        int pageSize = 12;
        try {
            Query query = entityManager.createNativeQuery(queryScript, EntityJob.class);
            query.setParameter("pageSize", pageSize);
            query.setParameter("pageNum", pageNum * pageSize);
            query.setParameter("filter", filter.toLowerCase());
            return query.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public List<EntityJob> findJobsBySkill(int pageNum, String filter) {
        String queryScript = """
            SELECT *
            FROM job
            WHERE REGEXP_INSTR(LCASE(skills), :filter) != 0
            LIMIT :pageSize
            OFFSET :pageNum 
        """;
        int pageSize = 12;
        filter = fixFilter(filter);
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

    private String fixFilter(String filter) {
        filter = filter.toLowerCase();
        if(filter.equals("c++")) {
            return "c\\+\\+";
        } else if(filter.equals("c")) {
            return "\\bc\\b[\\s,]|\\bc\\b$";
        } else if(filter.equals("c#")) {
            return "\\b" + filter;
        } else {
            return filter + "\\b";
        }
    }
}
