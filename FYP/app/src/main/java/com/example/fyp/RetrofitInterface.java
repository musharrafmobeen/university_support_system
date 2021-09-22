package com.example.fyp;

import com.example.fyp.requestResultsAndBodies.AnnouncementsResult;
import com.example.fyp.requestResultsAndBodies.CategoriesResult;
import com.example.fyp.requestResultsAndBodies.DeletedEmployeeResult;
import com.example.fyp.requestResultsAndBodies.DeletedStudentResult;
import com.example.fyp.requestResultsAndBodies.DocumentRequestResult;
import com.example.fyp.requestResultsAndBodies.EmployeesAccountsRequests;
import com.example.fyp.requestResultsAndBodies.GetStaffResult;
import com.example.fyp.requestResultsAndBodies.GrievancesResult;
import com.example.fyp.requestResultsAndBodies.LoginResultAdmin;
import com.example.fyp.requestResultsAndBodies.LoginResultEmployee;
import com.example.fyp.requestResultsAndBodies.LoginResultStaff;
import com.example.fyp.requestResultsAndBodies.LoginResultStudent;
import com.example.fyp.requestResultsAndBodies.SignUpResultEmployee;
import com.example.fyp.requestResultsAndBodies.SignUpResultStudent;
import com.example.fyp.requestResultsAndBodies.StaffAppointmentsResult;
import com.example.fyp.requestResultsAndBodies.StaffCreationResult;
import com.example.fyp.requestResultsAndBodies.StudentsAccountRequests;
import com.example.fyp.requestResultsAndBodies.UpdatedEmployeeResult;
import com.example.fyp.requestResultsAndBodies.UpdatedStudentResult;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Url;

public interface RetrofitInterface {
    @POST("/users/loginStudent")
    Call<LoginResultStudent> executeLoginStudent(@Body HashMap<String, String> map);

    @POST("/users/loginAdmin")
    Call<LoginResultAdmin> executeLoginAdmin(@Body HashMap<String, String> map);

    @POST("/users/loginEmployee")
    Call<LoginResultEmployee> executeLoginEmployee(@Body HashMap<String, String> map);

    @POST("/users/loginStaff")
    Call<LoginResultStaff> executeLoginStaff(@Body HashMap<String, String> map);

    @POST("/students")
    Call<SignUpResultStudent> executeSignUpStudent(@Body HashMap<String, String> map);

    @POST("/staffs/mobile")
    Call<StaffCreationResult> createStaff(@Body HashMap<String, String> map);

    @GET("/staffs")
    Call<GetStaffResult> getStaff();

    @POST("/employees")
    Call<SignUpResultEmployee> executeSignUpEmployee(@Body HashMap<String, String> map);

    @POST("/documentrequests/mobile")
    Call<DocumentRequestResult> requestADocument(@Body HashMap<String, String> map);

    @POST("/appointments")
    Call<SettingAnAppointment> requestAppointment(@Body HashMap<String, String> map);

    @GET("/students/unapprovedStudents")
    Call<StudentsAccountRequests> getUnApprovedStudents ();

    @GET("/employees/unapprovedEmployees")
    Call<EmployeesAccountsRequests> getUnApprovedEmployees();

    @GET("/grievances/androidApp")
    Call<GrievancesResult> getAllGrievances();

    @GET("/category/unassignedCategories")
    Call<CategoriesResult> getUnAssignedCategories();

    @GET("/employees/nonStaffEmployees")
    Call<EmployeesAccountsRequests> getAllNonStaffEmployees();

    @GET
    Call<StaffAppointmentsResult> getStaffRequestedAppointments (@Url String url );

    @GET
    Call<AnnouncementsResult> getAllAnnouncements(@Url String url );

//    @GET("/staffAnnouncements")
//    Call<AnnouncementsResult> getStaffAnnouncements();
//
//    @GET("/studentAnnouncements")
//    Call<AnnouncementsResult> getStudentAnnouncements();

    @GET
    Call<GrievancesResult> getCertainGrievances(@Url String url);

    @PATCH
    Call<UpdatedStudentResult> ApproveStudent(@Body HashMap<String, String> map, @Url String url);

    @PATCH
    Call<UpdatedEmployeeResult> ApproveEmployee(@Body HashMap<String, String> map, @Url String url);

    @DELETE
    Call<DeletedStudentResult> DeleteStudent(@Body HashMap<String, String> map, @Url String url);

    @DELETE
    Call<DeletedEmployeeResult> DeleteEmployee(@Body HashMap<String, String> map, @Url String url);

    @POST("/signup")
    Call<Void> executeSignup (@Body HashMap<String, String> map);
}
