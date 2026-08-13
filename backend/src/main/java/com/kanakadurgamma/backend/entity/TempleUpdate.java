package com.kanakadurgamma.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "temple_updates")
public class TempleUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Lob
    private String description;

    @Column(length = 100)
    private String category;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    public TempleUpdate() {
    }


    @PrePersist
    protected void onCreate() {

        LocalDateTime now =
                LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

    }


    @PreUpdate
    protected void onUpdate() {

        updatedAt =
                LocalDateTime.now();

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(
            String description) {

        this.description =
                description;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(
            String category) {

        this.category =
                category;
    }


    public Boolean getActive() {
        return active;
    }

    public void setActive(
            Boolean active) {

        this.active = active;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt) {

        this.createdAt =
                createdAt;
    }


    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(
            LocalDateTime updatedAt) {

        this.updatedAt =
                updatedAt;
    }
}