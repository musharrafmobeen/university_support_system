package com.example.fyp;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;

import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.jetbrains.annotations.NotNull;

import io.alterac.blurkit.BlurLayout;


public class OptionsFragment extends Fragment {

    CardView allGrievancesBtn;
    CardView seeAnnouncementsBtn;
    CardView appointmentBtn;
    CardView documentBtn;
    String userType = "";
    String name = "";
    String id = "";
    String imgUrl;
    BlurLayout announcementblurLayout;
    BlurLayout grievanceblurLayout;
    BlurLayout appointmentblurLayout;
    BlurLayout documentblurLayout;
    public OptionsFragment() {
        // Required empty public constructor
    }



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            userType = getArguments().getString("userType");
            name = getArguments().getString("name");
            id = getArguments().getString("id");
            imgUrl = getArguments().getString("image");
        }catch (Exception e){
                Toast.makeText(getContext(),e.getMessage(), Toast.LENGTH_LONG).show();
        }

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_options, container, false);
    }



    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
            creatingOptions(view);
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

    private void creatingOptions(View view){
        try {
            ImageView img = (ImageView)view.findViewById(R.id.optionImage);
            new DownloadImageTask(img)
                    .execute(BaseUrl.getBaseUrl()+imgUrl);
            announcementblurLayout = (BlurLayout)view.findViewById(R.id.optionsAnnouncementBlurLayout);
            grievanceblurLayout = (BlurLayout)view.findViewById(R.id.optionsGrievancesBlurLayout);
            appointmentblurLayout = (BlurLayout)view.findViewById(R.id.optionsAppointmentBlurLayout);
            documentblurLayout = (BlurLayout)view.findViewById(R.id.optionsDocumentBlurLayout);
            announcementblurLayout.startBlur();
            grievanceblurLayout.startBlur();
            appointmentblurLayout.startBlur();
            documentblurLayout.startBlur();
            TextView nameTextView = (TextView) getView().findViewById(R.id.optionNameTextView);
            nameTextView.setText(name);
            Toast.makeText(getContext(),"Welcome : " + name, Toast.LENGTH_LONG).show();
            documentBtn = (CardView)getView().findViewById(R.id.documentRequestLinkButton);
            appointmentBtn = (CardView)getView().findViewById(R.id.appointmentFragmentLinkButton);
            allGrievancesBtn = (CardView) getView().findViewById(R.id.SeeGrievanceFragmentLinkButton);
            final TextView grievanceTextView = (TextView)getView().findViewById(R.id.optionGrievanceTextView);
            final TextView appointmentTextView = (TextView)getView().findViewById(R.id.optionName2TextView);
            if (userType.equals("Staff")) {
                grievanceTextView.setText("Check Grievances Assigned To You");
                appointmentTextView.setText("Check Appointments Requested To You");
                documentBtn.setVisibility(View.GONE);
            }
            else if(userType.equals("Employee")){
//                allGrievancesBtn.
                appointmentBtn.setVisibility(View.GONE);
                documentBtn.setVisibility(View.GONE);
            }
            allGrievancesBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (userType.equals("Student")) {
                        StudentGrievancesFragment studentGrievancesFragment = new StudentGrievancesFragment();
                        Bundle args = new Bundle();
                        args.putString("id", id);
                        args.putString("name",name);
                        args.putString("userType",userType);
                        args.putString("image",imgUrl);
                        studentGrievancesFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment, studentGrievancesFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                    } else if (userType.equals("Employee")) {
                        EmployeeGrievancesFragment employeeGrievancesFragment = new EmployeeGrievancesFragment();
                        Bundle args = new Bundle();
                        args.putString("id", id);
                        args.putString("name",name);
                        args.putString("userType",userType);
                        args.putString("image",imgUrl);
                        employeeGrievancesFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment, employeeGrievancesFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                    } else if (userType.equals("Staff")) {
                        StaffGrievancesFragment staffGrievancesFragment = new StaffGrievancesFragment();
                        Bundle args = new Bundle();
                        args.putString("id", id);
                        args.putString("name",name);
                        args.putString("userType",userType);
                        args.putString("image",imgUrl);
                        staffGrievancesFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment, staffGrievancesFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                    }
                }
            });

            seeAnnouncementsBtn = (CardView) getView().findViewById(R.id.seeAnnouncementsFragmentLinkButton);
            seeAnnouncementsBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (userType.equals("Staff")) {
                        AnnouncementViewFragment announcementViewFragment = new AnnouncementViewFragment();
                        Bundle args = new Bundle();
                        args.putString("id", id);
                        args.putString("name",name);
                        args.putString("user",userType);
                        args.putString("userType", "Staff");
                        args.putString("image",imgUrl);
                        announcementViewFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment, announcementViewFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                    } else if (userType.equals("Student")) {
                        AnnouncementViewFragment announcementViewFragment = new AnnouncementViewFragment();
                        Bundle args = new Bundle();
                        args.putString("id", id);
                        args.putString("name",name);
                        args.putString("user",userType);
                        args.putString("userType", "Student");
                        args.putString("image",imgUrl);
                        announcementViewFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment, announcementViewFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                    } else {
                        AnnouncementViewFragment announcementViewFragment = new AnnouncementViewFragment();
                        Bundle args = new Bundle();
                        args.putString("userType", "All");
                        args.putString("id", id);
                        args.putString("name",name);
                        args.putString("user",userType);
                        args.putString("image",imgUrl);
                        announcementViewFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment, announcementViewFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                    }
                }
            });

            appointmentBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (userType.equals("Student")) {
                       SetupAnAppointmentFragment setupAnAppointmentFragment = new SetupAnAppointmentFragment();
                        Bundle args = new Bundle();
                        args.putString("userType", userType);
                        args.putString("id", id);
                        args.putString("name",name);
                        args.putString("image",imgUrl);
                        setupAnAppointmentFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment,setupAnAppointmentFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                    }
                    else if(userType.equals("Staff")) {
                        StaffAppointmentsFragment staffAppointmentsFragment = new StaffAppointmentsFragment();
                        Bundle args = new Bundle();
                        args.putString("userType", userType);
                        args.putString("id", id);
                        args.putString("name",name);
                        args.putString("image",imgUrl);
                        staffAppointmentsFragment.setArguments(args);
                        getFragmentManager().beginTransaction()
                                .replace(R.id.fl_fragment,staffAppointmentsFragment)
                                .commit();
                        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                    }
                }
            });

            documentBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    documentRequestTabLayoutFragment documentRequestFragment = new documentRequestTabLayoutFragment();
                    Bundle args = new Bundle();
                    args.putString("userType", userType);
                    args.putString("id", id);
                    args.putString("name",name);
                    args.putString("image",imgUrl);
                    documentRequestFragment.setArguments(args);
                    getFragmentManager().beginTransaction()
                            .replace(R.id.fl_fragment,documentRequestFragment)
                            .commit();
//                    getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                }
            });

            Button logOutBtn = (Button) getView().findViewById(R.id.optionsLogoutBtn);
            logOutBtn.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v) {
                    Toast.makeText(getContext(),"User LogedOut",Toast.LENGTH_LONG).show();
                    TitleScreenFragment titleScreenFragment = new TitleScreenFragment();
                    getFragmentManager().beginTransaction()
                            .replace(R.id.fl_fragment,titleScreenFragment)
                            .commit();
                    getActivity().findViewById(R.id.loadingPanel).setVisibility(View.VISIBLE);
                }
            });
        }catch (Exception e){
            Toast.makeText(getContext(),e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

}