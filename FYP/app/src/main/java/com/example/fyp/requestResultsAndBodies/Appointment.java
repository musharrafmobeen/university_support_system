package com.example.fyp.requestResultsAndBodies;

        import javax.annotation.Generated;

        import com.google.gson.annotations.Expose;
        import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class Appointment {

    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("staff")
    @Expose
    private String staff;
    @SerializedName("student")
    @Expose
    private String student;
    @SerializedName("appointmentDescription")
    @Expose
    private String appointmentDescription;
    @SerializedName("isGranted")
    @Expose
    private Boolean isGranted;
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

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public String getAppointmentDescription() {
        return appointmentDescription;
    }

    public void setAppointmentDescription(String appointmentDescription) {
        this.appointmentDescription = appointmentDescription;
    }

    public Boolean getIsGranted() {
        return isGranted;
    }

    public void setIsGranted(Boolean isGranted) {
        this.isGranted = isGranted;
    }

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

}