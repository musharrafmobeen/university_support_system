package com.example.fyp;

import android.app.AlertDialog;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.fyp.requestResultsAndBodies.LoginResultAdmin;
import com.example.fyp.requestResultsAndBodies.LoginResultEmployee;
import com.example.fyp.requestResultsAndBodies.LoginResultStaff;
import com.example.fyp.requestResultsAndBodies.LoginResultStudent;
import com.google.android.material.textfield.TextInputEditText;

import java.util.HashMap;

import io.alterac.blurkit.BlurLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class SignInFragment extends Fragment {
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    Button btn;
    Button signInBtn;
    String spinnerValue = "";
    BlurLayout blurLayout;
    public SignInFragment() {
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
        return inflater.inflate(R.layout.fragment_sign_in, container, false);
    }


    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
            blurLayout = view.findViewById(R.id.blurLayout);
            blurLayout.startBlur();
            btn = (Button) getView().findViewById(R.id.signUpLinkBtn);
            btn.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    SignUpFormsFragment signUpFormsFragment = new SignUpFormsFragment();
                    getFragmentManager().beginTransaction()
                            .replace(R.id.fl_fragment, signUpFormsFragment)
                            .commit();
                }
            });

            final TextInputEditText emailEdit = (TextInputEditText) view.findViewById(R.id.emailEditText);
            final TextInputEditText passwordEdit = (TextInputEditText) view.findViewById(R.id.passwordEditText);
            signInBtn = (Button) getView().findViewById(R.id.loginBtn);
            signInBtn.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {

                    HashMap<String, String> map = new HashMap<>();

                    map.put("email", emailEdit.getText().toString());
                    map.put("password", passwordEdit.getText().toString());

                    if (spinnerValue.equals("Student")) {
                        studentLogin(map);
                    } else if (spinnerValue.equals("Admin")) {
                        adminLogin(map);
                    } else if (spinnerValue.equals("Employee")) {
                        employeeLogin(map);
                    } else if (spinnerValue.equals("Staff")) {
                        staffLogin(map);
                    }


                }
            });

            setSpinner();
        }catch(Exception e){
            Toast.makeText(getContext(),e.getMessage(),Toast.LENGTH_LONG).show();
        }

    }



        private void setSpinner(){
            Spinner spinner = (Spinner) getView().findViewById(R.id.signInRoles);
            ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this.getContext(),
                    R.array.roles_array, android.R.layout.simple_spinner_item);
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
            spinner.setAdapter(adapter);
            spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view,
                                           int position, long id) {
                    spinnerValue = (String) parent.getItemAtPosition(position);
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {
                    // TODO Auto-generated method stub
                }
            });
        }





        private void studentLogin(HashMap<String, String> map){
            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
            Call<LoginResultStudent> call = retrofitInterface.executeLoginStudent(map);

            call.enqueue(new Callback<LoginResultStudent>() {
                @Override
                public void onResponse(Call<LoginResultStudent> call, Response<LoginResultStudent> response) {

                    if (response.code() == 200) {
                        LoginResultStudent result = response.body();
                        System.out.print(response.body());
                        AlertDialog.Builder builder1 = new AlertDialog.Builder(getContext());
                        if(!result.getStudent().getIsRejected()) {
                            if (result.getStudent().getIsApproved()) {
                                OptionsFragment optionsFragment = new OptionsFragment();
                                Bundle args = new Bundle();
                                args.putString("name", result.getStudent().getName());
                                args.putString("userType", "Student");
                                args.putString("id", result.getStudent().getId());
                                args.putString("image", result.getStudent().getStudentImage());
                                optionsFragment.setArguments(args);
                                getFragmentManager().beginTransaction()
                                        .replace(R.id.fl_fragment,optionsFragment)
                                        .commit();
                                getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);

                            } else {
                                String message = "Account Not Yet Approved.";
                                Toast.makeText(getContext(),message,Toast.LENGTH_LONG).show();
                                getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                            }

                        }
                        else{
                            String message = "Your Account Has Been Rejected.";
                            Toast.makeText(getContext(),message,Toast.LENGTH_LONG).show();
                            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                        }

                    } else if (response.code() == 404) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                    }
                    else if (response.code() == 401) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                    }
                }

                @Override
                public void onFailure(Call<LoginResultStudent> call, Throwable t) {
                    Toast.makeText(getContext(), t.getMessage(),
                            Toast.LENGTH_LONG).show();
                    getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                }
            });
        }

        private void adminLogin(HashMap<String, String> map){
            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
            Call<LoginResultAdmin> call = retrofitInterface.executeLoginAdmin(map);

            call.enqueue(new Callback<LoginResultAdmin>() {
                @Override
                public void onResponse(Call<LoginResultAdmin> call, Response<LoginResultAdmin> response) {

                    if (response.code() == 200) {
                        LoginResultAdmin result = response.body();
                        AdminOptionsFragment adminOptionsFragment = new AdminOptionsFragment();
                        Bundle args = new Bundle();
                        args.putString("name", result.getAdmin().getName());
                        args.putString("image",result.getAdmin().getAdminImage());
                        adminOptionsFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment,adminOptionsFragment )
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);

                    } else if (response.code() == 404) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                    }
                    else if (response.code() == 401) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                    }

                }

                @Override
                public void onFailure(Call<LoginResultAdmin> call, Throwable t) {
                    Toast.makeText(getContext(), t.getMessage(),
                            Toast.LENGTH_LONG).show();
                    getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                }

            });
        }


        private void staffLogin(HashMap<String, String> map){
            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
            Call<LoginResultStaff> call = retrofitInterface.executeLoginStaff(map);

            call.enqueue(new Callback<LoginResultStaff>() {
                @Override
                public void onResponse(Call<LoginResultStaff> call, Response<LoginResultStaff> response) {

                    if (response.code() == 200) {
                        LoginResultStaff result = response.body();
                        OptionsFragment optionsFragment = new OptionsFragment();
                        Bundle args = new Bundle();
                        args.putString("name", result.getStaff().getEmployee().getName());
                        args.putString("userType", "Staff");
                        args.putString("id", result.getStaff().getId());
                        args.putString("image", result.getStaff().getEmployee().getEmployeeImage());
                        optionsFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment,optionsFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);

                    } else if (response.code() == 404) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                    }
                    else if (response.code() == 401) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                    }

                }

                @Override
                public void onFailure(Call<LoginResultStaff> call, Throwable t) {
                    Toast.makeText(getContext(), t.getMessage(),
                            Toast.LENGTH_LONG).show();
                    getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                }


            });
        }


        private void employeeLogin(HashMap<String, String> map){
            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
            Call<LoginResultEmployee> call = retrofitInterface.executeLoginEmployee(map);

            call.enqueue(new Callback<LoginResultEmployee>() {
                @Override
                public void onResponse(Call<LoginResultEmployee> call, Response<LoginResultEmployee> response) {

                    if (response.code() == 200) {
                        LoginResultEmployee result = response.body();
                        AlertDialog.Builder builder1 = new AlertDialog.Builder(getContext());
                        if(!result.getEmployee().getIsRejected()) {
                            if (result.getEmployee().getIsApproved()) {
                                OptionsFragment optionsFragment = new OptionsFragment();
                                Bundle args = new Bundle();
                                args.putString("name", result.getEmployee().getName());
                                args.putString("userType", "Employee");
                                args.putString("id", result.getEmployee().getId());
                                args.putString("image", result.getEmployee().getEmployeeImage());
                                optionsFragment.setArguments(args);
                                getFragmentManager().beginTransaction()
                                        .replace(R.id.fl_fragment,optionsFragment)
                                        .commit();
                                getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                            } else {
                                String message = "Account Not Yet Approved.";
                                Toast.makeText(getContext(),message,Toast.LENGTH_LONG).show();
                                getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                            }

                        }
                        else{
                            String message = "Your Account Has Been Rejected.";
                            Toast.makeText(getContext(),message,Toast.LENGTH_LONG).show();
                            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                        }


                    } else if (response.code() == 404) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                    }
                    else if (response.code() == 401) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                    }

                }

                @Override
                public void onFailure(Call<LoginResultEmployee> call, Throwable t) {
                    Toast.makeText(getContext(), t.getMessage(),
                            Toast.LENGTH_LONG).show();
                    getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                }


            });
        }





}