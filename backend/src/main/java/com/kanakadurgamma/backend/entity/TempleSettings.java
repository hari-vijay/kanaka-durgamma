package com.kanakadurgamma.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "temple_settings")
public class TempleSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String templeName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String village;

    private String district;

    private String state;

    private String phone;

    private String email;

    private String locationUrl;

    private String openingTime;

    private String morningPooja;

    private String afternoonPooja;

    private String eveningAarti;

    private String closingTime;

    @Column(columnDefinition = "TEXT")
    private String specialTimings;

    @Column(name = "hero_image_path")
    private String heroImagePath;

    @Column(name = "about_image_path")
    private String aboutImagePath;

    @Column(name = "village_image_path")
    private String villageImagePath;

    @Column(name = "updated_at")
    private String updatedAt;

    public TempleSettings() {
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

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocationUrl() {
        return locationUrl;
    }

    public void setLocationUrl(String locationUrl) {
        this.locationUrl = locationUrl;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public String getMorningPooja() {
        return morningPooja;
    }

    public void setMorningPooja(String morningPooja) {
        this.morningPooja = morningPooja;
    }

    public String getAfternoonPooja() {
        return afternoonPooja;
    }

    public void setAfternoonPooja(String afternoonPooja) {
        this.afternoonPooja = afternoonPooja;
    }

    public String getEveningAarti() {
        return eveningAarti;
    }

    public void setEveningAarti(String eveningAarti) {
        this.eveningAarti = eveningAarti;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }

    public String getSpecialTimings() {
        return specialTimings;
    }

    public void setSpecialTimings(String specialTimings) {
        this.specialTimings = specialTimings;
    }

    public String getHeroImagePath() {
        return heroImagePath;
    }

    public void setHeroImagePath(String heroImagePath) {
        this.heroImagePath = heroImagePath;
    }

    public String getAboutImagePath() {
        return aboutImagePath;
    }

    public void setAboutImagePath(String aboutImagePath) {
        this.aboutImagePath = aboutImagePath;
    }

    public String getVillageImagePath() {
        return villageImagePath;
    }

    public void setVillageImagePath(String villageImagePath) {
        this.villageImagePath = villageImagePath;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}