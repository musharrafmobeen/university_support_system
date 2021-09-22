package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.example.fyp.requestResultsAndBodies.Employee;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class UpdatedEmployeeResult {

    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("updatedEmployee")
    @Expose
    private Employee updatedEmployee;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Employee getUpdatedEmployee() {
        return updatedEmployee;
    }

    public void setUpdatedEmployee(Employee updatedEmployee) {
        this.updatedEmployee = updatedEmployee;
    }

}