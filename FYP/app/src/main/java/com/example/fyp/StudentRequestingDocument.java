package com.example.fyp;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class StudentRequestingDocument {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("reg")
    @Expose
    private String reg;
    @SerializedName("faculty")
    @Expose
    private String faculty;
    @SerializedName("batch")
    @Expose
    private String batch;
    @SerializedName("course")
    @Expose
    private String course;
    @SerializedName("passPortNumber")
    @Expose
    private String passPortNumber;
    @SerializedName("fatherName")
    @Expose
    private String fatherName;
    @SerializedName("initialDateOfJoining")
    @Expose
    private String initialDateOfJoining;
    @SerializedName("currentSmester")
    @Expose
    private String currentSmester;
    @SerializedName("department")
    @Expose
    private String department;
    @SerializedName("nationality")
    @Expose
    private String nationality;
    @SerializedName("desiredUni")
    @Expose
    private String desiredUni;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReg() {
        return reg;
    }

    public void setReg(String reg) {
        this.reg = reg;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getPassPortNumber() {
        return passPortNumber;
    }

    public void setPassPortNumber(String passPortNumber) {
        this.passPortNumber = passPortNumber;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getInitialDateOfJoining() {
        return initialDateOfJoining;
    }

    public void setInitialDateOfJoining(String initialDateOfJoining) {
        this.initialDateOfJoining = initialDateOfJoining;
    }

    public String getCurrentSmester() {
        return currentSmester;
    }

    public void setCurrentSmester(String currentSmester) {
        this.currentSmester = currentSmester;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getDesiredUni() {
        return desiredUni;
    }

    public void setDesiredUni(String desiredUni) {
        this.desiredUni = desiredUni;
    }


}