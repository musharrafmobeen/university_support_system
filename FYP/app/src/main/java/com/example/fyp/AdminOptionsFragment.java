package com.example.fyp;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.jetbrains.annotations.NotNull;

import io.alterac.blurkit.BlurLayout;


public class AdminOptionsFragment extends Fragment {


    CardView studentAccountsRequestBtn;
    CardView employeeAccountsRequestBtn;
    CardView allGrievancesRequestBtn;
    CardView staffCreationBtn;
    Button logOutBtn;
    String name;
    String imgUrl;
    ImageView adminImage;
    TextView adminNameTextView;
//    BlurLayout blurLayout;
    BlurLayout studentVerificationblurLayout;
    BlurLayout employeeVerificationblurLayout;
    BlurLayout grievanceblurLayout;
    BlurLayout staffCreationblurLayout;
    public AdminOptionsFragment() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            name = getArguments().getString("name");
            imgUrl = getArguments().getString("image");
        }catch(Exception e){
            Toast.makeText(getContext(),e.getMessage(),Toast.LENGTH_LONG).show();
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_admin_options, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
//            blurLayout = (BlurLayout)view.findViewById(R.id.adminblurLayout);
            studentVerificationblurLayout = (BlurLayout)view.findViewById(R.id.adminStudentVerificationblurLayout);
            employeeVerificationblurLayout = (BlurLayout)view.findViewById(R.id.adminEmployeeVerificationblurLayout);
            grievanceblurLayout = (BlurLayout)view.findViewById(R.id.adminGrievanceblurLayout);
            staffCreationblurLayout = (BlurLayout)view.findViewById(R.id.adminStudentVerificationblurLayout);
//            blurLayout.startBlur();
            studentVerificationblurLayout.startBlur();
            employeeVerificationblurLayout.startBlur();
            staffCreationblurLayout.startBlur();
            grievanceblurLayout.startBlur();
            allAdminOptions(view);
            view.setFocusableInTouchMode(true);
            view.requestFocus();
            view.setOnKeyListener(new View.OnKeyListener() {
                @Override
                public boolean onKey(View v, int keyCode, KeyEvent event) {
                    if (keyCode == android.view.KeyEvent.KEYCODE_BACK && event.getAction() == android.view.KeyEvent.ACTION_UP) {
                        return true;
                    }
                    return false;
                }
            });
        }catch(Exception e){
            Toast.makeText(getContext(),e.getMessage(),Toast.LENGTH_LONG).show();
        }
    }

    private void allAdminOptions(View view){
        Toast.makeText(getContext(),"Welcome : " + name,Toast.LENGTH_LONG).show();
        adminImage = (ImageView)view.findViewById(R.id.adminImage);
        new DownloadImageTask(adminImage)
                .execute(BaseUrl.getBaseUrl()+imgUrl);
        adminNameTextView = (TextView)getView().findViewById(R.id.adminNameTextView);
        adminNameTextView.setText(name);
        logOutBtn = (Button)getView().findViewById(R.id.adminLogoutBtn);
        logOutBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Toast.makeText(getContext(),"User LogedOut",Toast.LENGTH_LONG).show();
                TitleScreenFragment titleScreenFragment = new TitleScreenFragment();
                getFragmentManager().beginTransaction()
                        .replace(R.id.fl_fragment,titleScreenFragment)
                        .commit();
            }
        });
        studentAccountsRequestBtn = (CardView) getView().findViewById(R.id.studentAccountVericationRequestsButton);
        studentAccountsRequestBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Bundle args = new Bundle();
                args.putString("name", name);
                args.putString("image", imgUrl);
                StudentsAccountsForVerificationFragment studentsAccountsForVerificationFragment = new StudentsAccountsForVerificationFragment();
                studentsAccountsForVerificationFragment.setArguments(args);
                getFragmentManager().beginTransaction()
                        .replace(R.id.fl_fragment,studentsAccountsForVerificationFragment )
                        .commit();
            }
        });

        employeeAccountsRequestBtn = (CardView)getView().findViewById(R.id.employeeAccountVericationRequestsButton);
        employeeAccountsRequestBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Bundle args = new Bundle();
                args.putString("name", name);
                args.putString("image", imgUrl);
                EmployeeAccountsForVerificationFragment employeeAccountsForVerificationFragment = new EmployeeAccountsForVerificationFragment();
                employeeAccountsForVerificationFragment.setArguments(args);
                getFragmentManager().beginTransaction()
                        .replace(R.id.fl_fragment,employeeAccountsForVerificationFragment)
                        .commit();
            }
        });

        allGrievancesRequestBtn = (CardView)getView().findViewById(R.id.grievanceRequestsButton);
        allGrievancesRequestBtn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Bundle args = new Bundle();
                args.putString("name", name);
                args.putString("image", imgUrl);
                AllGrievancesFragment allGrievancesFragment = new AllGrievancesFragment();
                allGrievancesFragment.setArguments(args);
                getFragmentManager().beginTransaction()
                        .replace(R.id.fl_fragment,allGrievancesFragment)
                        .commit();
            }
        });

        staffCreationBtn = (CardView)getView().findViewById(R.id.staffCreationButton);
        staffCreationBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Bundle args = new Bundle();
                args.putString("name", name);
                args.putString("image", imgUrl);
                StaffCreationFormFragment staffCreationFormFragment = new StaffCreationFormFragment();
                staffCreationFormFragment.setArguments(args);
                getFragmentManager().beginTransaction()
                        .replace(R.id.fl_fragment,staffCreationFormFragment)
                        .commit();
            }
        });
    }
}