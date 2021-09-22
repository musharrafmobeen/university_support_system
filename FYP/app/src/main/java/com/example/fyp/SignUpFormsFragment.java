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

import com.google.android.material.tabs.TabLayout;

import org.jetbrains.annotations.NotNull;

public class SignUpFormsFragment extends Fragment {
    float x1,x2,y1,y2;
    TabLayout tabLayout;
    String selectedTab = "employeeTab";
    public SignUpFormsFragment() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EmployeeSignUpFragment employeeSignUpFragment = new EmployeeSignUpFragment();
        getFragmentManager().beginTransaction().add(R.id.tabFrameLayout,employeeSignUpFragment)
                .commit();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_sign_up_forms, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
            createTabLayout();
            touchListener(view);
            view.setFocusableInTouchMode(true);
            view.requestFocus();
            view.setOnKeyListener(new View.OnKeyListener() {
                @Override
                public boolean onKey(View v, int keyCode, KeyEvent event) {
                    if (keyCode == android.view.KeyEvent.KEYCODE_BACK && event.getAction() == android.view.KeyEvent.ACTION_UP) {
                        SignInFragment signInFragment = new SignInFragment();
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment, signInFragment)
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

    private void createTabLayout(){
        tabLayout = (TabLayout)getView().findViewById(R.id.tablayout);
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                if(tab.getText().equals("Employee Form")){
                    selectedTab = "employeeTab";
                    EmployeeSignUpFragment employeeSignUpFragment = new EmployeeSignUpFragment();
                    getFragmentManager().beginTransaction().replace(R.id.tabFrameLayout,employeeSignUpFragment)
                            .commit();
                }
                else if(tab.getText().equals("Student Form")){
                    selectedTab = "studentTab";
                    StudentSignUpFragment studentSignUpFragment = new StudentSignUpFragment();
                    getFragmentManager().beginTransaction().replace(R.id.tabFrameLayout,studentSignUpFragment)
                            .commit();
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
                if(tab.getText().equals("Employee Form")){
                    selectedTab = "employeeTab";
                    EmployeeSignUpFragment employeeSignUpFragment = new EmployeeSignUpFragment();
                    getFragmentManager().beginTransaction().replace(R.id.tabFrameLayout,employeeSignUpFragment)
                            .commit();
                }
                else if(tab.getText().equals("Student Form")){
                    selectedTab = "studentTab";
                    StudentSignUpFragment studentSignUpFragment = new StudentSignUpFragment();
                    getFragmentManager().beginTransaction().replace(R.id.tabFrameLayout,studentSignUpFragment)
                            .commit();
                }
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
                if(tab.getText().equals("Employee Form")){
                    selectedTab = "employeeTab";
                    EmployeeSignUpFragment employeeSignUpFragment = new EmployeeSignUpFragment();
                    getFragmentManager().beginTransaction().replace(R.id.tabFrameLayout,employeeSignUpFragment)
                            .commit();
                }
                else if(tab.getText().equals("Student Form")){
                    selectedTab = "studentTab";
                    StudentSignUpFragment studentSignUpFragment = new StudentSignUpFragment();
                    getFragmentManager().beginTransaction().replace(R.id.tabFrameLayout,studentSignUpFragment)
                            .commit();
                }
            }
        });}




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
                            if(selectedTab.equals("studentTab")){
                                tabLayout.getTabAt(0).select();
                                selectedTab = "employeeTab";
                                EmployeeSignUpFragment employeeSignUpFragment = new EmployeeSignUpFragment();
                                getFragmentManager().beginTransaction().replace(R.id.tabFrameLayout,employeeSignUpFragment)
                                        .commit();
                            }
                            else{
                                SignInFragment signInFragment = new SignInFragment();
                                getFragmentManager().beginTransaction()
                                        .replace(R.id.fl_fragment,signInFragment)
                                        .commit();
                            }
                        }
                        if(x1 > x2){
                            tabLayout.getTabAt(1).select();
                            selectedTab = "studentTab";
                            StudentSignUpFragment studentSignUpFragment = new StudentSignUpFragment();
                            getFragmentManager().beginTransaction().replace(R.id.tabFrameLayout,studentSignUpFragment)
                                    .commit();
                        }
                        break;
                }
                return true;
            }
        });
    }
}