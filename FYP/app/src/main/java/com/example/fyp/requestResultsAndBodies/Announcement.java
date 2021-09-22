package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;



@Generated("jsonschema2pojo")
public class Announcement {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("announcement")
    @Expose
    private String announcement;
    @SerializedName("announcerType")
    @Expose
    private String announcerType;
    @SerializedName("visibleTo")
    @Expose
    private String visibleTo;
    @SerializedName("dateCreated")
    @Expose
    private String dateCreated;
    @SerializedName("request")
    @Expose
    private Request request;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAnnouncement() {
        return announcement;
    }

    public void setAnnouncement(String announcement) {
        this.announcement = announcement;
    }

    public String getAnnouncerType() {
        return announcerType;
    }

    public void setAnnouncerType(String announcerType) {
        this.announcerType = announcerType;
    }

    public String getVisibleTo() {
        return visibleTo;
    }

    public void setVisibleTo(String visibleTo) {
        this.visibleTo = visibleTo;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

}