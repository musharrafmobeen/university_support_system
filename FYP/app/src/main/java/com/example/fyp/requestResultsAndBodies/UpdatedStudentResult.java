package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class UpdatedStudentResult {

    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("updatedStudent")
    @Expose
    private UpdatedStudent updatedStudent;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UpdatedStudent getUpdatedStudent() {
        return updatedStudent;
    }

    public void setUpdatedStudent(UpdatedStudent updatedStudent) {
        this.updatedStudent = updatedStudent;
    }

}