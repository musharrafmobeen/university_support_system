package com.example.fyp;

import android.os.Bundle;

import androidx.annotation.NonNull;
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

public class SignUpFragment extends Fragment {

    Button btn;
    String spinnerValue = "";
    public SignUpFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_sign_up, container, false);
    }


    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        btn = (Button)getView().findViewById(R.id.signUpFormLinkBtn);
        btn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                switch(spinnerValue) {
                    case "Admin":
                        AdminSignUpFragment adminSignUpFragment = new AdminSignUpFragment();
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment,adminSignUpFragment)
                                .commit();
                        break;
                    case "Employee":
                        EmployeeSignUpFragment employeeSignUpFragment = new EmployeeSignUpFragment();
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment,employeeSignUpFragment)
                                .commit();
                        break;
                    case "Student":
                        StudentSignUpFragment studentSignUpFragment = new StudentSignUpFragment();
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment,studentSignUpFragment)
                                .commit();
                        break;
                }
            }
        });
        Spinner spinner = (Spinner) view.findViewById(R.id.roles_spinner);
// Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this.getContext(),
                R.array.roles_array, android.R.layout.simple_spinner_item);
// Specify the layout to use when the list of choices appears
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
// Apply the adapter to the spinner
        spinner.setAdapter(adapter);

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view,
                                       int position, long id) {
                Log.v("item", (String) parent.getItemAtPosition(position));
                spinnerValue = (String) parent.getItemAtPosition(position);
                Toast.makeText(getActivity(), spinnerValue,
                        Toast.LENGTH_LONG).show();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                // TODO Auto-generated method stub
            }
        });

    }
}