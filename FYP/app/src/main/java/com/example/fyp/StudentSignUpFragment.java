package com.example.fyp;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.Toast;

import com.example.fyp.requestResultsAndBodies.SignUpResultStudent;
import com.google.android.material.textfield.TextInputEditText;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;

import io.alterac.blurkit.BlurLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class StudentSignUpFragment extends Fragment {
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    String facultyName = "";
    String courseName = "";
    String batchName = "";
    Button signUpBtn;
    BlurLayout blurLayout;
    public StudentSignUpFragment() {
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
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_student_sign_up, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        createNewStudent(view);
    }



    private void createNewStudent(View view){
        try {
            blurLayout = view.findViewById(R.id.studentblurLayout);
            blurLayout.startBlur();
            String[] faculties = new String[]{"FBAS", "Sharia"};
            String[] courses = new String[]{"BSSE", "BSCS"};
            String[] batches = new String[]{"F17", "F16",};

            ArrayAdapter<String> faculty_adapter =
                    new ArrayAdapter<>(
                            getContext(),
                            R.layout.list_item,
                            faculties);

            ArrayAdapter<String> courses_adapter =
                    new ArrayAdapter<>(
                            getContext(),
                            R.layout.list_item,
                            courses);

            ArrayAdapter<String> batch_adapter =
                    new ArrayAdapter<>(
                            getContext(),
                            R.layout.list_item,
                            batches);

            AutoCompleteTextView facultyDropDown = (AutoCompleteTextView)
                    getView().findViewById(R.id.studentMenuAutocomplete);
            facultyDropDown.setAdapter(faculty_adapter);

            AutoCompleteTextView courseDropDown = (AutoCompleteTextView)
                    getView().findViewById(R.id.studentCourseMenuAutocomplete);
            courseDropDown.setAdapter(courses_adapter);

            AutoCompleteTextView batchDropDown = (AutoCompleteTextView)
                    getView().findViewById(R.id.studentBatchMenuAutocomplete);
            batchDropDown.setAdapter(batch_adapter);

            facultyDropDown.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    facultyName = (String) parent.getItemAtPosition(position);
                    Toast.makeText(StudentSignUpFragment.this.getContext(), "working", Toast.LENGTH_LONG).show();
                }
            });

            courseDropDown.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    courseName = (String) parent.getItemAtPosition(position);
                }
            });

            batchDropDown.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    batchName = (String) parent.getItemAtPosition(position);
                }
            });


            final TextInputEditText emailEdit = (TextInputEditText) view.findViewById(R.id.studentEmailEditText);
            final TextInputEditText passwordEdit = (TextInputEditText) view.findViewById(R.id.studentPasswordEditText);
            final TextInputEditText nameEdit = (TextInputEditText) view.findViewById(R.id.studentNameEditText);
            TextInputEditText regEdit = (TextInputEditText) view.findViewById(R.id.regEditText);
            final TextInputEditText departmentEdit = (TextInputEditText) view.findViewById(R.id.studentDepartmentEditText);
            final TextInputEditText courseEdit = (TextInputEditText) view.findViewById(R.id.studentCourseEditText);

            signUpBtn = (Button) getView().findViewById(R.id.studentSignUpBtn);
            signUpBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (regEdit.getText().length() != 0 && facultyName != "" && courseName != "" && batchName != "" && emailEdit.getText().length() != 0 && passwordEdit.getText().length() != 0 &&
                            departmentEdit.getText().length() != 0 && courseEdit.getText().length() != 0 &&
                            nameEdit.getText().length() != 0) {
                        HashMap<String, String> map = new HashMap<>();
                        map.put("email", emailEdit.getText().toString());
                        map.put("password", passwordEdit.getText().toString());
                        map.put("reg", regEdit.getText().toString() + "-" + facultyName + "/" + courseName + "/" + batchName);
                        map.put("department", departmentEdit.getText().toString());
                        map.put("course", courseEdit.getText().toString());
                        map.put("name", nameEdit.getText().toString());

                        Call<SignUpResultStudent> call = retrofitInterface.executeSignUpStudent(map);

                        call.enqueue(new Callback<SignUpResultStudent>() {
                            @Override
                            public void onResponse(Call<SignUpResultStudent> call, Response<SignUpResultStudent> response) {

                                if (response.code() == 201) {
                                    SignUpResultStudent result = response.body();
                                    Toast.makeText(getContext(), "Student Created, Wait For Approval", Toast.LENGTH_LONG).show();
                                } else if (response.code() == 409) {
                                    Toast.makeText(getContext(), "User Already Registered",
                                            Toast.LENGTH_LONG).show();
                                } else if (response.code() == 404) {
                                    Toast.makeText(getContext(), "Wrong Credentials",
                                            Toast.LENGTH_LONG).show();
                                }
                            }

                            @Override
                            public void onFailure(Call<SignUpResultStudent> call, Throwable t) {
                                Toast.makeText(getContext(), t.getMessage(),
                                        Toast.LENGTH_LONG).show();
                            }
                        });
                    } else {
                        Toast.makeText(getContext(), "Fill All The Available Fields", Toast.LENGTH_LONG).show();
                    }
                }
            });
        }catch (Exception e){
            Toast.makeText(getContext(), e.getMessage(), Toast.LENGTH_LONG).show();
        }
    };

}