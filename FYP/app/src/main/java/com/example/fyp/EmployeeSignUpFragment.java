package com.example.fyp;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.fyp.requestResultsAndBodies.SignUpResultEmployee;
import com.google.android.material.textfield.TextInputEditText;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;

import io.alterac.blurkit.BlurLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class EmployeeSignUpFragment extends Fragment {
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    Button signUpBtn;
    BlurLayout blurLayout;
    public EmployeeSignUpFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(@Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_employee_sign_up, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        createNewEmployee(view);
    }






    private void createNewEmployee(View view){
        try {
            blurLayout = view.findViewById(R.id.employeeblurLayout);
            blurLayout.startBlur();
            final TextInputEditText emailEdit = (TextInputEditText) getView().findViewById(R.id.employeeEmailEditText);
            final TextInputEditText passwordEdit = (TextInputEditText) getView().findViewById(R.id.employeePasswordEditText);
            final TextInputEditText nameEdit = (TextInputEditText) getView().findViewById(R.id.employeeNameEdittext);
            final TextInputEditText idEdit = (TextInputEditText) getView().findViewById(R.id.employeeIdEditText);
            final TextInputEditText departmentEdit = (TextInputEditText) getView().findViewById(R.id.employeeDepartmentEdittext);
            final TextInputEditText designationEdit = (TextInputEditText) getView().findViewById(R.id.employeeDesignationEditText);
            signUpBtn = (Button) getView().findViewById(R.id.employeeSignUpBtn);
            signUpBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (idEdit.getText().length() != 0 && emailEdit.getText().length() != 0 && passwordEdit.getText().length() != 0 && departmentEdit.getText().length() != 0 && designationEdit.getText().length() != 0 && nameEdit.getText().length() != 0) {

                        HashMap<String, String> map = new HashMap<>();
                        map.put("email", emailEdit.getText().toString());
                        map.put("password", passwordEdit.getText().toString());
                        map.put("employee_ID", idEdit.getText().toString());
                        map.put("department", departmentEdit.getText().toString());
                        map.put("designation", designationEdit.getText().toString());
                        map.put("name", nameEdit.getText().toString());

                        Call<SignUpResultEmployee> call = retrofitInterface.executeSignUpEmployee(map);

                        call.enqueue(new Callback<SignUpResultEmployee>() {
                            @Override
                            public void onResponse(Call<SignUpResultEmployee> call, Response<SignUpResultEmployee> response) {

                                if (response.code() == 201) {
                                    SignUpResultEmployee result = response.body();
                                    Toast.makeText(getContext(), "Employee Created, Wait For Approval", Toast.LENGTH_LONG).show();

                                } else if (response.code() == 409) {
                                    Toast.makeText(getContext(), "User Already Registered",
                                            Toast.LENGTH_LONG).show();
                                } else if (response.code() == 404) {
                                    Toast.makeText(getContext(), "Wrong Credentials",
                                            Toast.LENGTH_LONG).show();
                                }

                            }

                            @Override
                            public void onFailure(Call<SignUpResultEmployee> call, Throwable t) {
                                Toast.makeText(getContext(), t.getMessage(),
                                        Toast.LENGTH_LONG).show();
                            }
                        });
                    } else {
                        Toast.makeText(getContext(), "Fill All Fields", Toast.LENGTH_LONG).show();
                    }
                }
            });
        }catch (Exception e){
            Toast.makeText(getContext(), e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

}