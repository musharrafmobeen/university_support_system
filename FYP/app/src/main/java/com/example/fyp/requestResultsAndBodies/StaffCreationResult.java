package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.example.fyp.requestResultsAndBodies.CreatedStaff;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class StaffCreationResult {

    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("createdStaff")
    @Expose
    private CreatedStaff createdStaff;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CreatedStaff getCreatedStaff() {
        return createdStaff;
    }

    public void setCreatedStaff(CreatedStaff createdStaff) {
        this.createdStaff = createdStaff;
    }

}