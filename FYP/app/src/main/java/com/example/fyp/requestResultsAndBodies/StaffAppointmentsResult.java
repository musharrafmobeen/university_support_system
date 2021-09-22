package com.example.fyp.requestResultsAndBodies;

import java.util.List;
import javax.annotation.Generated;

import com.example.fyp.requestResultsAndBodies.AppointmentWithPopulatedStudent;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class StaffAppointmentsResult {

    @SerializedName("count")
    @Expose
    private Integer count;
    @SerializedName("appointsments")
    @Expose
    private List<AppointmentWithPopulatedStudent> appointsments = null;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<AppointmentWithPopulatedStudent> getAppointsments() {
        return appointsments;
    }

    public void setAppointsments(List<AppointmentWithPopulatedStudent> appointsments) {
        this.appointsments = appointsments;
    }

}