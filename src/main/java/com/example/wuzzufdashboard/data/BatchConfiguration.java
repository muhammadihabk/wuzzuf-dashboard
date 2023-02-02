package com.example.wuzzufdashboard.data;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.transaction.PlatformTransactionManager;

import com.example.wuzzufdashboard.model.EntityJob;

@Configuration
public class BatchConfiguration {
    String[] fieldsNames = {"id", "title", "company", "location", "type", "level", "yearsExp", "country", "skills"};
    
    @Bean
    public FlatFileItemReader<InputJob> reader() {
        return new FlatFileItemReaderBuilder<InputJob>()
                .name("InputJobReader")
                .resource(new ClassPathResource("data/Wuzzuf_Jobs.tsv"))
                .delimited()
                .delimiter("\t")
                .names(fieldsNames)
                .fieldSetMapper(new BeanWrapperFieldSetMapper<InputJob>() {
                    {
                        setTargetType(InputJob.class);
                    }
                })
                .linesToSkip(1)
                .build();
    }

    @Bean
    public JobProcessor processor() {
        return new JobProcessor();
    }

    @Bean
    public JdbcBatchItemWriter<EntityJob> writer(DataSource dataSource) {
        return new JdbcBatchItemWriterBuilder<EntityJob>()
            .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
            .sql("""
                    INSERT INTO job (id, role, company, level, yoe, skills)
                    VALUES (:id, :role, :company, :level, :yoe, :skills)
                """)
            .dataSource(dataSource)
            .build();
    }

    @Bean
    public Job importUserJob(JobRepository jobRepository,
            JobCompletionNotificationListener listener, Step step1) {
        return new JobBuilder("importUserJob", jobRepository)
                .incrementer(new RunIdIncrementer())
                .listener(listener)
                .flow(step1)
                .end()
                .build();
    }

    @Bean
    public Step step1(JobRepository jobRepository,
            PlatformTransactionManager transactionManager,
            JdbcBatchItemWriter<EntityJob> writer) {
        return new StepBuilder("step1", jobRepository)
                .<InputJob, EntityJob>chunk(10, transactionManager)
                .reader(reader())
                .processor(processor())
                .writer(writer)
                .build();
    }
}
