package com.example.fyp.requestResultsAndBodies;

import java.util.List;
import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class GetStaffResult {

    @SerializedName("count")
    @Expose
    private Integer count;
    @SerializedName("staffs")
    @Expose
    private List<Staff> staffs = null;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<Staff> getStaffs() {
        return staffs;
    }

    public void setStaffs(List<Staff> staffs) {
        this.staffs = staffs;
    }

}