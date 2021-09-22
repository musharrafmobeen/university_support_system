package com.example.fyp;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.Toast;

import com.example.fyp.requestResultsAndBodies.CategoriesResult;
import com.example.fyp.requestResultsAndBodies.Category;
import com.example.fyp.requestResultsAndBodies.Employee;
import com.example.fyp.requestResultsAndBodies.EmployeesAccountsRequests;
import com.example.fyp.requestResultsAndBodies.StaffCreationResult;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.List;

import io.alterac.blurkit.BlurLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class StaffCreationFormFragment extends Fragment {
    float x1,x2,y1,y2;
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    Button createStaffBtn;
    String inChargeOf = "";
    String employeeId = "";
    BlurLayout blurLayout;
    public StaffCreationFormFragment() {
        // Required empty public constructor
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_staff_creation_form, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
            blurLayout = (BlurLayout)view.findViewById(R.id.staffCreationFormblurLayout);
            blurLayout.startBlur();
            touchListener(view);
            getCategories();
            getEmployees();
            createStaffBtn = (Button)getView().findViewById(R.id.staffCreateBtn);
            createStaffBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
                    builder.setCancelable(true);
                    builder.setTitle("Create Staff");
                    builder.setMessage("Click On Confirm To Create A Staff");
                    builder.setPositiveButton("Confirm",
                            new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {
                                    createStaff();
                                }
                            });
                    builder.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                        }
                    });

                    AlertDialog dialog = builder.create();
                    dialog.show();

                }
            });
            view.setFocusableInTouchMode(true);
            view.requestFocus();
            view.setOnKeyListener(new View.OnKeyListener() {
                @Override
                public boolean onKey(View v, int keyCode, KeyEvent event) {
                    if (keyCode == android.view.KeyEvent.KEYCODE_BACK && event.getAction() == android.view.KeyEvent.ACTION_UP) {

                        Bundle args = new Bundle();
                        args.putString("name", getArguments().getString("name"));
                        args.putString("image", getArguments().getString("image"));
                        AdminOptionsFragment adminOptionsFragment = new AdminOptionsFragment();
                        adminOptionsFragment.setArguments(args);
                        getFragmentManager().beginTransaction().add(R.id.fl_fragment,adminOptionsFragment)
                                .commit();
                        view.setVisibility(View.GONE);
                        return true;
                    }
                    return false;
                }
            });
        }catch(Exception e){
            Toast.makeText(getContext(),e.getMessage(),Toast.LENGTH_LONG).show();
        }

    }

    private void getCategories(){
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);
        Call<CategoriesResult> call = retrofitInterface.getUnAssignedCategories();

        call.enqueue(new Callback<CategoriesResult>() {
            @Override
            public void onResponse(Call<CategoriesResult> call, Response<CategoriesResult> response) {
                if (response.code() == 200) {
                    CategoriesResult categoriesResult = response.body();

                    List<Category> categories = categoriesResult.getCategories();
                    String[] categoriesNames = new String[categoriesResult.getCount()];
                    for(int i = 0 ; i < categoriesResult.getCount();i++){
                        categoriesNames[i] = categories.get(i).getName();
                    }

                    ArrayAdapter<String> categoryName_adapter =
                    new ArrayAdapter<>(
                            getContext(),
                            R.layout.list_item,
                            categoriesNames);

                    AutoCompleteTextView categoryDropDown = (AutoCompleteTextView)
                            getView().findViewById(R.id.availableCategoriesMenuAutocomplete);
                    categoryDropDown.setAdapter(categoryName_adapter);

                    categoryDropDown.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                            inChargeOf = categories.get(position).getId();
                        }
                    });

                }
                else if (response.code() == 409) {
                    Toast.makeText(getContext(), "User Already Registered",
                            Toast.LENGTH_LONG).show();
                }
                else if (response.code() == 404) {
                    Toast.makeText(getContext(), "Wrong Credentials",
                            Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<CategoriesResult> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void getEmployees(){
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);
        Call<EmployeesAccountsRequests> call = retrofitInterface.getAllNonStaffEmployees();

        call.enqueue(new Callback<EmployeesAccountsRequests>() {
            @Override
            public void onResponse(Call<EmployeesAccountsRequests> call, Response<EmployeesAccountsRequests> response) {
                if (response.code() == 200) {
                    EmployeesAccountsRequests employeesAccountsRequests = response.body();


                    List<Employee> employees = employeesAccountsRequests.getEmployees();
                    String[] employeeNames = new String[employeesAccountsRequests.getCount()];
                    for(int i = 0 ; i < employeesAccountsRequests.getCount();i++){
                        employeeNames[i] = employees.get(i).getName();
                    }
                    ArrayAdapter<String> employeeName_adapter =
                            new ArrayAdapter<>(
                                    getContext(),
                                    R.layout.list_item,
                                    employeeNames);

                    AutoCompleteTextView employeeDropDown = (AutoCompleteTextView)
                            getView().findViewById(R.id.availableEmployeesMenuAutocomplete);
                    employeeDropDown.setAdapter(employeeName_adapter);

                    employeeDropDown.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                            employeeId = employees.get(position).getId();
                        }
                    });

                }
                else if (response.code() == 409) {
                    Toast.makeText(getContext(), "User Already Registered",
                            Toast.LENGTH_LONG).show();
                }
                else if (response.code() == 404) {
                    Toast.makeText(getContext(), "Wrong Credentials",
                            Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<EmployeesAccountsRequests> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void createStaff(){
        if(!employeeId.equals("") && !inChargeOf.equals("") && employeeId.length() != 0 && inChargeOf.length() != 0 ){
            HashMap<String, String> map = new HashMap<>();
            map.put("employee", employeeId);
            map.put("inChargeOf", inChargeOf);
            map.put("isAvailable","true");
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();

            retrofitInterface = retrofit.create(RetrofitInterface.class);
            Call<StaffCreationResult> call = retrofitInterface.createStaff(map);

            call.enqueue(new Callback<StaffCreationResult>() {
                @Override
                public void onResponse(Call<StaffCreationResult> call, Response<StaffCreationResult> response) {
                    if (response.code() == 201) {

                        StaffCreationResult employeesAccountsRequests = response.body();


                        Toast.makeText(getContext(), "New Staff Has Been Created",
                                Toast.LENGTH_LONG).show();

                    }
                    else if (response.code() == 409) {
                        Toast.makeText(getContext(), "User Already Registered",
                                Toast.LENGTH_LONG).show();
                    }
                    else if (response.code() == 404) {
                        Toast.makeText(getContext(), "Wrong Credentials",
                                Toast.LENGTH_LONG).show();
                    }
                }

                @Override
                public void onFailure(Call<StaffCreationResult> call, Throwable t) {
                    Toast.makeText(getContext(), t.getMessage(),
                            Toast.LENGTH_LONG).show();
                }
            });
        }
        else{
            Toast.makeText(getContext(), "Select Options From Every Field.",
                    Toast.LENGTH_LONG).show();
        }
    }


    private void touchListener(View view) {
        view.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent touchEvent) {
                switch(touchEvent.getAction()){
                    case MotionEvent.ACTION_DOWN:
                        x1 = touchEvent.getX();
                        y1 = touchEvent.getY();
                        break;
                    case MotionEvent.ACTION_UP:
                        x2 = touchEvent.getX();
                        y2 = touchEvent.getY();
                        if(x1 < x2){
                            Bundle args = new Bundle();
                            args.putString("name", getArguments().getString("name"));
                            args.putString("image", getArguments().getString("image"));
                            AdminOptionsFragment adminOptionsFragment = new AdminOptionsFragment();
                            adminOptionsFragment.setArguments(args);
                            getFragmentManager().beginTransaction().add(R.id.fl_fragment,adminOptionsFragment)
                                    .commit();
                            view.setVisibility(View.GONE);
                        }
                        if(x1 > x2){

                        }
                        break;
                }
                return true;
            }
        });
    }
}