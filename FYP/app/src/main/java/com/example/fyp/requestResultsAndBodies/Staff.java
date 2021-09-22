package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.example.fyp.requestResultsAndBodies.Employee;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class Staff {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("employee")
    @Expose
    private Employee employee;
    @SerializedName("inChargeOf")
    @Expose
    private String inChargeOf;
    @SerializedName("isAvailable")
    @Expose
    private Boolean isAvailable;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getInChargeOf() {
        return inChargeOf;
    }

    public void setInChargeOf(String inChargeOf) {
        this.inChargeOf = inChargeOf;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

}