package com.example.fyp.requestResultsAndBodies;

import javax.annotation.Generated;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class DocumentRequestResult {

    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("createdDocuementRequest")
    @Expose
    private CreatedDocumentRequest createdDocumentRequest;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CreatedDocumentRequest getCreatedDocuementRequest() {
        return createdDocumentRequest;
    }

    public void setCreatedDocuementRequest(CreatedDocumentRequest createdDocumentRequest) {
        this.createdDocumentRequest = createdDocumentRequest;
    }

}