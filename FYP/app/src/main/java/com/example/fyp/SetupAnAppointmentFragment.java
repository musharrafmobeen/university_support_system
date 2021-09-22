package com.example.fyp;

import android.content.DialogInterface;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
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

import com.example.fyp.requestResultsAndBodies.GetStaffResult;
import com.example.fyp.requestResultsAndBodies.Staff;
import com.google.android.material.textfield.TextInputEditText;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.List;

import io.alterac.blurkit.BlurLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SetupAnAppointmentFragment extends Fragment {
    float x1,x2,y1,y2;
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    String staffId = "";
    Button requestAppointmentBtn;
    BlurLayout blurLayout;
    public SetupAnAppointmentFragment() {
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
        return inflater.inflate(R.layout.fragment_setup_an_appointment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
            blurLayout = (BlurLayout)view.findViewById(R.id.appointmentCreationFormblurLayout);
            blurLayout.startBlur();
            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
            touchListener(view);
            requestAppointmentFromStaff(view);
            view.setFocusableInTouchMode(true);
            view.requestFocus();
            view.setOnKeyListener(new View.OnKeyListener() {
                @Override
                public boolean onKey(View v, int keyCode, KeyEvent event) {
                    if (keyCode == android.view.KeyEvent.KEYCODE_BACK && event.getAction() == android.view.KeyEvent.ACTION_UP) {
                        Bundle args = new Bundle();
                        args.putString("name", getArguments().getString("name"));
                        args.putString("userType", getArguments().getString("userType"));
                        args.putString("id", getArguments().getString("id"));
                        args.putString("image", getArguments().getString("image"));
                        OptionsFragment optionsFragment = new OptionsFragment();
                        optionsFragment.setArguments(args);
                        getFragmentManager().beginTransaction().replace(R.id.fl_fragment,optionsFragment)
                                .commit();
                        return true;
                    }
                    return false;
                }
            });

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
                            getView().findViewById(R.id.availableStaffForAppointmentMenuAutocomplete);
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

    private void requestAppointmentFromStaff(View view) {
        getStaffForAppointments(view);
        requestAppointmentBtn = (Button) view.findViewById(R.id.requestAppointmentButton);
        requestAppointmentBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
                builder.setCancelable(true);
                builder.setTitle("Appointment Request.");
                builder.setMessage("Click On Confirm To Lodge Your Appointment Request.");
                builder.setPositiveButton("Confirm",
                        new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                TextInputEditText appointmentDescription = (TextInputEditText) view.findViewById(R.id.appointmentDescriptionText);
                                if (appointmentDescription.getText().length() != 0) {
                                    HashMap<String, String> map = new HashMap<>();
                                    map.put("staff", staffId);
                                    map.put("student", getArguments().getString("id"));
                                    map.put("appointmentDescription", appointmentDescription.getText().toString());
                                    retrofit = new Retrofit.Builder()
                                            .baseUrl(BASE_URL)
                                            .addConverterFactory(GsonConverterFactory.create())
                                            .build();

                                    retrofitInterface = retrofit.create(RetrofitInterface.class);
                                    Call<SettingAnAppointment> call = retrofitInterface.requestAppointment(map);

                                    call.enqueue(new Callback<SettingAnAppointment>() {
                                        @Override
                                        public void onResponse(Call<SettingAnAppointment> call, Response<SettingAnAppointment> response) {
                                            if (response.code() == 201) {

                                                SettingAnAppointment settingAnAppointment = response.body();
                                                Toast.makeText(getContext(), "Request For Appointment Lodged, Wait For Approval.",
                                                        Toast.LENGTH_LONG).show();

                                            } else if (response.code() == 409) {
                                                Toast.makeText(getContext(), "You Have Already Requested For An Appointment With Said Staff",
                                                        Toast.LENGTH_LONG).show();
                                            } else if (response.code() == 500) {
                                                Toast.makeText(getContext(), "Error Occured While Requesting For An Appointment.",
                                                        Toast.LENGTH_LONG).show();
                                            }
                                        }

                                        @Override
                                        public void onFailure(Call<SettingAnAppointment> call, Throwable t) {
                                            Toast.makeText(getContext(), t.getMessage(),
                                                    Toast.LENGTH_LONG).show();
                                        }
                                    });
                                } else {
                                    Toast.makeText(getContext(), "Fill All Fields.",
                                            Toast.LENGTH_LONG).show();
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
                            args.putString("userType", getArguments().getString("userType"));
                            args.putString("id", getArguments().getString("id"));
                            args.putString("image", getArguments().getString("image"));
                            OptionsFragment optionsFragment = new OptionsFragment();
                            optionsFragment.setArguments(args);
                            getFragmentManager().beginTransaction().replace(R.id.fl_fragment,optionsFragment)
                                    .commit();
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