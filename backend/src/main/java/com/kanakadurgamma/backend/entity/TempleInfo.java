package com.kanakadurgamma.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "temple_info")
public class TempleInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "temple_name", nullable = false, length = 200)
    private String templeName;

    @Lob
    private String description;

    @Lob
    private String history;

    @Column(name = "village_name", length = 150)
    private String villageName;

    @Column(length = 150)
    private String mandal;

    @Column(length = 150)
    private String district;

    @Column(length = 100)
    private String state;

    @Column(name = "contact_phone", length = 30)
    private String contactPhone;

    @Column(name = "contact_email", length = 150)
    private String contactEmail;

    @Lob
    @Column(name = "temple_address")
    private String templeAddress;

    @Column(name = "opening_time")
    private LocalTime openingTime;

    @Column(name = "closing_time")
    private LocalTime closingTime;

    @Column(name = "morning_pooja_time")
    private LocalTime morningPoojaTime;

    @Column(name = "afternoon_pooja_time")
    private LocalTime afternoonPoojaTime;

    @Column(name = "evening_aarti_time")
    private LocalTime eveningAartiTime;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    public TempleInfo() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getTempleName() {
        return templeName;
    }

    public void setTempleName(String templeName) {
        this.templeName = templeName;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }


    public String getVillageName() {
        return villageName;
    }

    public void setVillageName(String villageName) {
        this.villageName = villageName;
    }


    public String getMandal() {
        return mandal;
    }

    public void setMandal(String mandal) {
        this.mandal = mandal;
    }


    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }


    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }


    public String getTempleAddress() {
        return templeAddress;
    }

    public void setTempleAddress(String templeAddress) {
        this.templeAddress = templeAddress;
    }


    public LocalTime getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(LocalTime openingTime) {
        this.openingTime = openingTime;
    }


    public LocalTime getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(LocalTime closingTime) {
        this.closingTime = closingTime;
    }


    public LocalTime getMorningPoojaTime() {
        return morningPoojaTime;
    }

    public void setMorningPoojaTime(LocalTime morningPoojaTime) {
        this.morningPoojaTime = morningPoojaTime;
    }


    public LocalTime getAfternoonPoojaTime() {
        return afternoonPoojaTime;
    }

    public void setAfternoonPoojaTime(LocalTime afternoonPoojaTime) {
        this.afternoonPoojaTime = afternoonPoojaTime;
    }


    public LocalTime getEveningAartiTime() {
        return eveningAartiTime;
    }

    public void setEveningAartiTime(LocalTime eveningAartiTime) {
        this.eveningAartiTime = eveningAartiTime;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}