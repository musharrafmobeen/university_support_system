package com.example.fyp;

import javax.annotation.Generated;

import com.example.fyp.requestResultsAndBodies.Appointment;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class SettingAnAppointment {

    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("createdAppointment")
    @Expose
    private Appointment createdAppointment;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Appointment getCreatedAppointment() {
        return createdAppointment;
    }

    public void setCreatedAppointment(Appointment createdAppointment) {
        this.createdAppointment = createdAppointment;
    }

}