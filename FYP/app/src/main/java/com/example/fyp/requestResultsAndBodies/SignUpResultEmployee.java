package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.example.fyp.requestResultsAndBodies.CreatedEmployee;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class SignUpResultEmployee {

    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("statusCode")
    @Expose
    private Integer statusCode;
    @SerializedName("employee")
    @Expose
    private CreatedEmployee employee;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public CreatedEmployee getEmployee() {
        return employee;
    }

    public void setEmployee(CreatedEmployee employee) {
        this.employee = employee;
    }

}