package com.example.fyp.requestResultsAndBodies;

import com.example.fyp.StudentRequestingDocument;


public class documentPost {


    private String staff;
    private StudentRequestingDocument student;
    private String documentType;

    public String getStaff() {
        return staff;
    }

    public void setStaff(String staff) {
        this.staff = staff;
    }

    public StudentRequestingDocument getStudent() {
        return student;
    }


    public void setStudent(StudentRequestingDocument student) {
        this.student =student;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

}