package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class Grievance {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("lodgedBy")
    @Expose
    private String lodgedBy;
    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("description")
    @Expose
    private String description;
    @SerializedName("category")
    @Expose
    private String category;
    @SerializedName("lodgingDate")
    @Expose
    private String lodgingDate;
    @SerializedName("lastUpdated")
    @Expose
    private String lastUpdated;
    @SerializedName("closingDate")
    @Expose
    private String closingDate;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("ticket")
    @Expose
    private Integer ticket;
    @SerializedName("inCharge")
    @Expose
    private String inCharge;
    @SerializedName("isClosed")
    @Expose
    private Boolean isClosed;
    @SerializedName("isSpam")
    @Expose
    private Boolean isSpam;
    @SerializedName("isDelayed")
    @Expose
    private Boolean isDelayed;
    @SerializedName("isPaused")
    @Expose
    private Boolean isPaused;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLodgedBy() {
        return lodgedBy;
    }

    public void setLodgedBy(String lodgedBy) {
        this.lodgedBy = lodgedBy;
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

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLodgingDate() {
        return lodgingDate;
    }

    public void setLodgingDate(String lodgingDate) {
        this.lodgingDate = lodgingDate;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getClosingDate() {
        return closingDate;
    }

    public void setClosingDate(String closingDate) {
        this.closingDate = closingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getTicket() {
        return ticket;
    }

    public void setTicket(Integer ticket) {
        this.ticket = ticket;
    }

    public String getInCharge() {
        return inCharge;
    }

    public void setInCharge(String inCharge) {
        this.inCharge = inCharge;
    }

    public Boolean getIsClosed() {
        return isClosed;
    }

    public void setIsClosed(Boolean isClosed) {
        this.isClosed = isClosed;
    }

    public Boolean getIsSpam() {
        return isSpam;
    }

    public void setIsSpam(Boolean isSpam) {
        this.isSpam = isSpam;
    }

    public Boolean getIsDelayed() {
        return isDelayed;
    }

    public void setIsDelayed(Boolean isDelayed) {
        this.isDelayed = isDelayed;
    }

    public Boolean getIsPaused() {
        return isPaused;
    }

    public void setIsPaused(Boolean isPaused) {
        this.isPaused = isPaused;
    }

}