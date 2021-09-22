package com.example.fyp.requestResultsAndBodies;

import java.util.List;
import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class StudentsAccountRequests {

    @SerializedName("count")
    @Expose
    private Integer count;
    @SerializedName("students")
    @Expose
    private List<studentsWaitingForApproval> students = null;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<studentsWaitingForApproval> getStudents() {
        return students;
    }

    public void setStudents(List<studentsWaitingForApproval> students) {
        this.students = students;
    }

}
