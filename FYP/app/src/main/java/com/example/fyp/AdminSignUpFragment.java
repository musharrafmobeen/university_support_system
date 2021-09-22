package com.example.fyp;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;


public class AdminSignUpFragment extends Fragment {

    Button btn;

    public AdminSignUpFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_admin_sign_up, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
//        btn = (Button)getView().findViewById(R.id.signUpLinkBtn);
//        btn.setOnClickListener(new View.OnClickListener() {
//            public void onClick(View v) {
//                SignUpFragment signUpFragment = new SignUpFragment();
//                getFragmentManager().beginTransaction()
//                        .replace(R.id.fl_fragment,signUpFragment)
//                        .commit();
//            }
//        });
    }
}