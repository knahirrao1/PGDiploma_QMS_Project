package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "modules")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Module extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false, foreignKey = @ForeignKey(name = "fk_module_admin"))
    private Admin admin;

    private String title;
    private String description;

    @Column(name = "no_of_quizzes")
    private String numberOfQuizzes;

    @Column(name = "created_at")
    private LocalDate createdAt;

}

