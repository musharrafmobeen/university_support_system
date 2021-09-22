package com.example.fyp.requestResultsAndBodies;

import java.util.List;
import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class GrievancesResult {

    @SerializedName("count")
    @Expose
    private Integer count;
    @SerializedName("grievances")
    @Expose
    private List<Grievance> grievances = null;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<Grievance> getGrievances() {
        return grievances;
    }

    public void setGrievances(List<Grievance> grievances) {
        this.grievances = grievances;
    }

}