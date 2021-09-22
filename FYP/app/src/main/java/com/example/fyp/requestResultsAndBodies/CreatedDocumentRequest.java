package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.example.fyp.StudentRequestingDocument;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class CreatedDocumentRequest {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("staff")
    @Expose
    private String staff;
    @SerializedName("student")
    @Expose
    private StudentRequestingDocument student;
    @SerializedName("documentUrl")
    @Expose
    private String documentUrl;
    @SerializedName("documentType")
    @Expose
    private String documentType;
    @SerializedName("isGranted")
    @Expose
    private Boolean isGranted;
    @SerializedName("dateGranted")
    @Expose
    private String dateGranted;
    @SerializedName("response")
    @Expose
    private Response response;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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
        this.student = student;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public Boolean getIsGranted() {
        return isGranted;
    }

    public void setIsGranted(Boolean isGranted) {
        this.isGranted = isGranted;
    }

    public String getDateGranted() {
        return dateGranted;
    }

    public void setDateGranted(String dateGranted) {
        this.dateGranted = dateGranted;
    }

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

}