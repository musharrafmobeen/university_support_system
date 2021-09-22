package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class AppointmentWithPopulatedStudent{

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("staff")
    @Expose
    private String staff;
    @SerializedName("student")
    @Expose
    private Student student;
    @SerializedName("isGranted")
    @Expose
    private Boolean isGranted;
    @SerializedName("appointment_ID")
    @Expose
    private Integer appointmentID;
    @SerializedName("appointmentDescription")
    @Expose
    private String appointmentDescription;
    @SerializedName("request")
    @Expose
    private Request request;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStaff() {
        return staff;
    }

    public void setStaff(String staff) {
        this.staff = staff;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Boolean getIsGranted() {
        return isGranted;
    }

    public void setIsGranted(Boolean isGranted) {
        this.isGranted = isGranted;
    }

    public Integer getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Integer appointmentID) {
        this.appointmentID = appointmentID;
    }

    public String getAppointmentDescription() {
        return appointmentDescription;
    }

    public void setAppointmentDescription(String appointmentDescription) {
        this.appointmentDescription = appointmentDescription;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

}