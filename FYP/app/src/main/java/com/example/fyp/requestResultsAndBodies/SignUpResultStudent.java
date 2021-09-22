package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.example.fyp.requestResultsAndBodies.CreatedStudent;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class SignUpResultStudent {

    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("createdStudent")
    @Expose
    private CreatedStudent createdStudent;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CreatedStudent getCreatedStudent() {
        return createdStudent;
    }

    public void setCreatedStudent(CreatedStudent createdStudent) {
        this.createdStudent = createdStudent;
    }

}