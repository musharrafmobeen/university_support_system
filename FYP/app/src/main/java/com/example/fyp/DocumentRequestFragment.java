package com.example.fyp;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.Toast;

import com.example.fyp.requestResultsAndBodies.DocumentRequestResult;
import com.example.fyp.requestResultsAndBodies.GetStaffResult;
import com.example.fyp.requestResultsAndBodies.Staff;
import com.google.android.material.textfield.TextInputEditText;
import com.google.gson.JsonObject;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.List;

import io.alterac.blurkit.BlurLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class DocumentRequestFragment extends Fragment {
    TextInputEditText datePicker;
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    String staffId = "";
    String facultyName = "";
    String courseName = "";
    String batchName = "";
    Button requestBtn;
    BlurLayout blurLayout;
    Button requestAppointmentBtn;
    public DocumentRequestFragment() {
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
        return inflater.inflate(R.layout.fragment_document_request, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
//        datePicker = (TextInputEditText)view.findViewById(R.id.date_picker_actionsEdittext);
        try {
            blurLayout = (BlurLayout)view.findViewById(R.id.referenceblurLayout);
            blurLayout.startBlur();
            MyEditTextDatePicker myEditTextDatePicker = new MyEditTextDatePicker(view.getContext(), R.id.date_picker_actionsEdittext);
            handleDocumentRequest(view);
        }catch(Exception e){
            Toast.makeText(getContext(),e.getMessage(),Toast.LENGTH_LONG).show();
        }

    }


    private void getStaffForAppointments(View view){
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);
        Call<GetStaffResult> call = retrofitInterface.getStaff();

        call.enqueue(new Callback<GetStaffResult>() {
            @Override
            public void onResponse(Call<GetStaffResult> call, Response<GetStaffResult> response) {
                if (response.code() == 200) {
                    GetStaffResult getStaffResult = response.body();
                    List<Staff> staffs = getStaffResult.getStaffs();
                    String[] staffNames = new String[getStaffResult.getCount()];
                    for(int i = 0 ; i < getStaffResult.getCount();i++){
                        staffNames[i] = staffs.get(i).getEmployee().getName();
                    }
                    ArrayAdapter<String> employeeName_adapter =
                            new ArrayAdapter<>(
                                    view.getContext(),
                                    R.layout.list_item,
                                    staffNames);

                    AutoCompleteTextView staffDropDown = (AutoCompleteTextView)
                            view.findViewById(R.id.staffDocumentRequestMenuAutocomplete);
                    staffDropDown.setAdapter(employeeName_adapter);
                    staffDropDown.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                            staffId = staffs.get(position).getId();
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
            public void onFailure(Call<GetStaffResult> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

    private void handleDocumentRequest(View view){
        try {
            getStaffForAppointments(view);
            String[] faculties = new String[]{"FBAS"};
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
                    getView().findViewById(R.id.facultyDocumentRequestMenuAutocomplete);
            facultyDropDown.setAdapter(faculty_adapter);

            AutoCompleteTextView courseDropDown = (AutoCompleteTextView)
                    getView().findViewById(R.id.studentCourseDocumentRequestMenuAutocomplete);
            courseDropDown.setAdapter(courses_adapter);

            AutoCompleteTextView batchDropDown = (AutoCompleteTextView)
                    getView().findViewById(R.id.studentBatchDocumentRequestMenuAutocomplete);
            batchDropDown.setAdapter(batch_adapter);

            facultyDropDown.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    facultyName = (String) parent.getItemAtPosition(position);
                    Toast.makeText(getContext(), "working", Toast.LENGTH_LONG).show();
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


            final TextInputEditText desiredUniEdit = (TextInputEditText) view.findViewById(R.id.desiredInstituteNameEdittext);
            final TextInputEditText currentSemesterEdit = (TextInputEditText) view.findViewById(R.id.currentSemesterDocumentRequesttext);
            final TextInputEditText departmentEdit = (TextInputEditText) view.findViewById(R.id.departmentDocumentRequesttext);
            final TextInputEditText dateEdit = (TextInputEditText) view.findViewById(R.id.date_picker_actionsEdittext);
            final TextInputEditText regEdit = (TextInputEditText) view.findViewById(R.id.regDocumentRequestEditText);

//            studentRequestingDocument.setDepartment();
            requestBtn = (Button) getView().findViewById(R.id.DocumentRequestBtn);
            requestBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
                    builder.setCancelable(true);
                    builder.setTitle("Request Document");
                    builder.setMessage("Click On Confirm To Request For The Document");
                    builder.setPositiveButton("Confirm",
                            new DialogInterface.OnClickListener() {
                                @Override
                                public void onClick(DialogInterface dialog, int which) {
                                    if (regEdit.getText().length() != 0 && facultyName != "" && courseName != "" && batchName != "" && departmentEdit.getText().length() != 0 && currentSemesterEdit.getText().length() != 0 &&
                                            desiredUniEdit.getText().length() != 0 && dateEdit.getText().length() != 0 &&
                                            staffId != "") {
                                        HashMap<String, String> map = new HashMap<>();

                                        map.put("staff", staffId);
                                        map.put("id",getArguments().getString("id"));
                                        map.put("name", getArguments().getString("name"));
                                        map.put("reg", regEdit.getText().toString());
                                        map.put("faculty", facultyName);
                                        map.put("batch", batchName);
                                        map.put("course", courseName);
                                        map.put("passPortNumber", "");
                                        map.put("fatherName", "");
                                        map.put("initialDateOfJoining", dateEdit.getText().toString());
                                        map.put("currentSmester",currentSemesterEdit.getText().toString());
                                        map.put("department", departmentEdit.getText().toString());
                                        map.put("nationality", "");
                                        map.put("desiredUni", desiredUniEdit.getText().toString());
                                        map.put("documentType", "refrenceLetter");


                                        Call<DocumentRequestResult> call = retrofitInterface.requestADocument(map);

                                        call.enqueue(new Callback<DocumentRequestResult>() {
                                            @Override
                                            public void onResponse(Call<DocumentRequestResult> call, Response<DocumentRequestResult> response) {

                                                if (response.code() == 201) {
                                                    DocumentRequestResult result = response.body();
                                                    Toast.makeText(getContext(), "Document Requested, Wait For Approval", Toast.LENGTH_LONG).show();
                                                } else if (response.code() == 409) {
                                                    Toast.makeText(getContext(), "User Already Registered",
                                                            Toast.LENGTH_LONG).show();
                                                } else if (response.code() == 404) {
                                                    Toast.makeText(getContext(), "Wrong Credentials",
                                                            Toast.LENGTH_LONG).show();
                                                }
                                            }

                                            @Override
                                            public void onFailure(Call<DocumentRequestResult> call, Throwable t) {
                                                Toast.makeText(getContext(), t.getMessage(),
                                                        Toast.LENGTH_LONG).show();
                                            }
                                        });
                                    } else {
                                        Toast.makeText(getContext(), "Fill All The Available Fields", Toast.LENGTH_LONG).show();
                                    }
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
        }catch (Exception e){
            Toast.makeText(getContext(), e.getMessage(), Toast.LENGTH_LONG).show();
        }
    };
}

