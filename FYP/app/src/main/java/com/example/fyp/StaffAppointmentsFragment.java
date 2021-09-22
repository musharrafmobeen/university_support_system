package com.example.fyp;

import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.fyp.recylcerviewadpters.AppointmentRecyclerViewAdapter;
import com.example.fyp.requestResultsAndBodies.AppointmentWithPopulatedStudent;
import com.example.fyp.requestResultsAndBodies.StaffAppointmentsResult;

import org.jetbrains.annotations.NotNull;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class StaffAppointmentsFragment extends Fragment {
    float x1,x2,y1,y2;
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    RecyclerView recyclerView ;
    AppointmentRecyclerViewAdapter recyclerViewAdapter;
    List<AppointmentWithPopulatedStudent> appointmentList;
    public StaffAppointmentsFragment() {
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
        return inflater.inflate(R.layout.fragment_staff_appointments, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
            touchListener(view);
            getStaffRequestedAppointments(view);
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

    private void getStaffRequestedAppointments(View view){
        recyclerView = (RecyclerView)view.findViewById(R.id.announcementStaffRecyclerView);
        String id = getArguments().getString("id");
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);
        Call<StaffAppointmentsResult> call = retrofitInterface.getStaffRequestedAppointments("/appointments/staffAppointments/"+id);

        call.enqueue(new Callback<StaffAppointmentsResult>() {
            @Override
            public void onResponse(Call<StaffAppointmentsResult> call, Response<StaffAppointmentsResult> response) {
                if (response.code() == 200) {
                    appointmentList  = response.body().getAppointsments();
                    recyclerViewAdapter = new AppointmentRecyclerViewAdapter(appointmentList);
                    RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getActivity());
                    recyclerView.setLayoutManager(layoutManager);
                    recyclerView.setAdapter(recyclerViewAdapter);

                    Toast.makeText(getActivity(),"Showing All Requested Appointments, If You Want To Approve Go To The Site And Setup An Appointment.",Toast.LENGTH_LONG).show();

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
            public void onFailure(Call<StaffAppointmentsResult> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(),
                        Toast.LENGTH_LONG).show();
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