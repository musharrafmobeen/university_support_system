package com.example.fyp.requestResultsAndBodies;

import java.util.List;
import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class AnnouncementsResult {

    @SerializedName("count")
    @Expose
    private Integer count;
    @SerializedName("announcements")
    @Expose
    private List<Announcement> announcements = null;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<Announcement> getAnnouncements() {
        return announcements;
    }

    public void setAnnouncements(List<Announcement> announcements) {
        this.announcements = announcements;
    }

}