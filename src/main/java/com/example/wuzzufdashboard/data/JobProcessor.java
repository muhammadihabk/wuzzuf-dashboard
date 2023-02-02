package com.example.wuzzufdashboard.data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.lang.NonNull;

import com.example.wuzzufdashboard.model.EntityJob;

public class JobProcessor implements ItemProcessor<InputJob, EntityJob> {

  private static final Logger log = LoggerFactory.getLogger(JobProcessor.class);

  @Override
  public EntityJob process(@NonNull final InputJob inputJob) throws Exception {
    return new EntityJob(
      Long.parseLong(inputJob.getId()),
      inputJob.getTitle(),
      inputJob.getCompany(),
      inputJob.getLevel(),
      inputJob.getYearsExp(),
      inputJob.getSkills());
  }

}
