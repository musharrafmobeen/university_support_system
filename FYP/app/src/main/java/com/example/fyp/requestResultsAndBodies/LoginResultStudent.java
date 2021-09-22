package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.example.fyp.requestResultsAndBodies.Student;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class LoginResultStudent {

    @SerializedName("token")
    @Expose
    private String token;
    @SerializedName("userType")
    @Expose
    private String userType;
    @SerializedName("student")
    @Expose
    private Student student;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

}