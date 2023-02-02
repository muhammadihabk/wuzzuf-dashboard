package com.example.wuzzufdashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "job")
public class EntityJob {
    @Id
    private long id;
    private String role;
    private String company;
    private String level;
    private String yoe;
    private String skills;
}
