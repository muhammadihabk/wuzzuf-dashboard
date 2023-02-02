package com.example.wuzzufdashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wuzzufdashboard.model.EntityJob;
import com.example.wuzzufdashboard.repository.EntityJobRepository;

@RestController
@RequestMapping("/app/jobs")
@CrossOrigin
public class JobController {
    private EntityJobRepository jobRepository;

    @Autowired
    public JobController(EntityJobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping
    public List<EntityJob> findAllJobs() {
        return (List<EntityJob>) jobRepository.findAll();
    }
    
    @GetMapping("/by_company/{company}")
    public List<EntityJob> findJobsByCompany(@PathVariable String company) {
        return jobRepository.findByCompany(company);
    }
    
    @GetMapping("/by_skill/{skill}")
    public List<EntityJob> findJobsBySkill(@PathVariable String skill) {
        return jobRepository.findBySkill(skill);
    }
}
