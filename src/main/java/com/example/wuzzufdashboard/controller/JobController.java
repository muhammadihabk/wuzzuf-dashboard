package com.example.wuzzufdashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.wuzzufdashboard.model.EntityJob;
import com.example.wuzzufdashboard.repository.EntityJobRepository;

@RestController
@RequestMapping("/app")
@CrossOrigin
public class JobController {

    private EntityJobRepository jobRepository;

    @Autowired
    public JobController(EntityJobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping("/jobs")
    public List<EntityJob> findJobsInPages(@RequestParam("pageNum") int pageNum,
            @RequestParam(name="filter", required=false) String filter) {
        if(filter.equals("")) {
            return jobRepository.findJobsInPages(pageNum);
        } else {
            return jobRepository.findJobsFiltered(pageNum, filter);
        }
    }
    
    @GetMapping("/company")
    public List<EntityJob> findJobsByCompany(@RequestParam("pageNum") int pageNum,
        @RequestParam("filter") String filter) {
        return jobRepository.findJobsByCompany(pageNum, filter);
    }
    
    @GetMapping("/skill")
    public List<EntityJob> findJobsBySkill(@RequestParam("pageNum") int pageNum,
        @RequestParam("filter") String filter) {
        return jobRepository.findJobsBySkill(pageNum, filter);
    }
}
