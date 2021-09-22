package com.example.fyp;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.fyp.recylcerviewadpters.StudentRecyclerViewAdapter;
import com.example.fyp.requestResultsAndBodies.StudentsAccountRequests;
import com.example.fyp.requestResultsAndBodies.studentsWaitingForApproval;

import org.jetbrains.annotations.NotNull;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class StudentsAccountsForVerificationFragment extends Fragment {
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    RecyclerView recyclerView ;
    StudentRecyclerViewAdapter studentRecyclerViewAdapter;
    List<studentsWaitingForApproval> studentList;
    Button approveBtn;
    public StudentsAccountsForVerificationFragment() {
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
        return inflater.inflate(R.layout.fragment_students_accounts_for_verification, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
            getStudentsForVerificaton();
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
                        recyclerView.setAdapter(null);
                        return true;
                    }
                    return false;
                }
            });
        }catch(Exception e){
            Toast.makeText(getContext(),e.getMessage(),Toast.LENGTH_LONG).show();
        }
    }

    private void getStudentsForVerificaton(){
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);
        Call<StudentsAccountRequests> call = retrofitInterface.getUnApprovedStudents();

        call.enqueue(new Callback<StudentsAccountRequests>() {
            @Override
            public void onResponse(Call<StudentsAccountRequests> call, Response<StudentsAccountRequests> response) {

                if (response.code() == 200) {


                    StudentsAccountRequests result = response.body();

                    System.out.print(response.body());

                    Toast.makeText(getContext(),"count = "+result.getCount(),Toast.LENGTH_LONG).show();

                    studentList  = result.getStudents();

                    recyclerView = (RecyclerView)getView().findViewById(R.id.studentRecyclerView);
                    studentRecyclerViewAdapter = new StudentRecyclerViewAdapter(studentList);
                    RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getContext());
                    recyclerView.setLayoutManager(layoutManager);
                    recyclerView.setAdapter(studentRecyclerViewAdapter);

                    Toast.makeText(getContext(), "Students Yet UnApproved",
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
            public void onFailure(Call<StudentsAccountRequests> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }

}