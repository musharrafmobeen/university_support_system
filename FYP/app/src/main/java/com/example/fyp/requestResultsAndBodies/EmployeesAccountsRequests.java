package com.example.fyp.requestResultsAndBodies;

import java.util.List;
import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class EmployeesAccountsRequests {

    @SerializedName("count")
    @Expose
    private Integer count;
    @SerializedName("employees")
    @Expose
    private List<Employee> employees = null;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

}