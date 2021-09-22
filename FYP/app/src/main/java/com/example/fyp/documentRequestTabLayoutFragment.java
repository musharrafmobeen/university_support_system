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


public class documentRequestTabLayoutFragment extends Fragment {
    float x1,x2,y1,y2;
    TabLayout tabLayout;
    String selectedTab = "referenceTab";
    public documentRequestTabLayoutFragment() {
        // Required empty public constructor
    }




    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Bundle args = new Bundle();
        args.putString("name", getArguments().getString("name"));
        args.putString("userType", getArguments().getString("userType"));
        args.putString("id", getArguments().getString("id"));
        DocumentRequestFragment documentRequestFragment= new DocumentRequestFragment();
        documentRequestFragment.setArguments(args);
        getFragmentManager().beginTransaction().add(R.id.tabDocumentFrameLayout,documentRequestFragment)
                .commit();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_document_request_tab_layout, container, false);
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

    private void createTabLayout(){
        tabLayout = (TabLayout)getView().findViewById(R.id.documentTablayout);
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                if(tab.getText().equals("Reference Letter")){
                    selectedTab = "referenceTab";
                    Bundle args = new Bundle();
                    args.putString("name", getArguments().getString("name"));
                    args.putString("userType", getArguments().getString("userType"));
                    args.putString("id", getArguments().getString("id"));
                    DocumentRequestFragment documentRequestFragment= new DocumentRequestFragment();
                    documentRequestFragment.setArguments(args);
                    getFragmentManager().beginTransaction().replace(R.id.tabDocumentFrameLayout,documentRequestFragment)
                            .commit();
                }
                else if(tab.getText().equals("Bonafide Certificate")){
                    selectedTab = "bonafideCertificateTab";
                    Bundle args = new Bundle();
                    args.putString("name", getArguments().getString("name"));
                    args.putString("userType", getArguments().getString("userType"));
                    args.putString("id", getArguments().getString("id"));
                    documentRequestBonafideCertificateFragment documentRequestBonafideCertificateFragment = new documentRequestBonafideCertificateFragment();
                    documentRequestBonafideCertificateFragment.setArguments(args);
                    getFragmentManager().beginTransaction().replace(R.id.tabDocumentFrameLayout,documentRequestBonafideCertificateFragment)
                            .commit();
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
                if(tab.getText().equals("Reference Letter")){
                    selectedTab = "referenceTab";
                    Bundle args = new Bundle();
                    args.putString("name", getArguments().getString("name"));
                    args.putString("userType", getArguments().getString("userType"));
                    args.putString("id", getArguments().getString("id"));
                    DocumentRequestFragment documentRequestFragment= new DocumentRequestFragment();
                    documentRequestFragment.setArguments(args);
                    getFragmentManager().beginTransaction().replace(R.id.tabDocumentFrameLayout,documentRequestFragment)
                            .commit();
                }
                else if(tab.getText().equals("Bonafide Certificate")){
                    selectedTab = "bonafideCertificateTab";
                    Bundle args = new Bundle();
                    args.putString("name", getArguments().getString("name"));
                    args.putString("userType", getArguments().getString("userType"));
                    args.putString("id", getArguments().getString("id"));
                    documentRequestBonafideCertificateFragment documentRequestBonafideCertificateFragment = new documentRequestBonafideCertificateFragment();
                    documentRequestBonafideCertificateFragment.setArguments(args);
                    getFragmentManager().beginTransaction().replace(R.id.tabDocumentFrameLayout,documentRequestBonafideCertificateFragment)
                            .commit();
                }
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
                if(tab.getText().equals("Reference Letter")){
                    selectedTab = "referenceTab";
                    Bundle args = new Bundle();
                    args.putString("name", getArguments().getString("name"));
                    args.putString("userType", getArguments().getString("userType"));
                    args.putString("id", getArguments().getString("id"));
                    DocumentRequestFragment documentRequestFragment= new DocumentRequestFragment();
                    documentRequestFragment.setArguments(args);
                    getFragmentManager().beginTransaction().replace(R.id.tabDocumentFrameLayout,documentRequestFragment)
                            .commit();
                }
                else if(tab.getText().equals("Bonafide Certificate")){
                    selectedTab = "bonafideCertificateTab";
                    Bundle args = new Bundle();
                    args.putString("name", getArguments().getString("name"));
                    args.putString("userType", getArguments().getString("userType"));
                    args.putString("id", getArguments().getString("id"));
                    documentRequestBonafideCertificateFragment documentRequestBonafideCertificateFragment = new documentRequestBonafideCertificateFragment();
                    documentRequestBonafideCertificateFragment.setArguments(args);
                    getFragmentManager().beginTransaction().replace(R.id.tabDocumentFrameLayout,documentRequestBonafideCertificateFragment)
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
                            if(selectedTab.equals("bonafideCertificateTab")){
                                tabLayout.getTabAt(0).select();
                                selectedTab = "referenceTab";
                                Bundle args = new Bundle();
                                args.putString("name", getArguments().getString("name"));
                                args.putString("userType", getArguments().getString("userType"));
                                args.putString("id", getArguments().getString("id"));
                                DocumentRequestFragment documentRequestFragment= new DocumentRequestFragment();
                                documentRequestFragment.setArguments(args);;
                                getFragmentManager().beginTransaction().replace(R.id.tabDocumentFrameLayout,documentRequestFragment)
                                        .commit();
                            }
                            else{
                                Bundle args = new Bundle();
                                args.putString("name", getArguments().getString("name"));
                                args.putString("userType", getArguments().getString("userType"));
                                args.putString("id", getArguments().getString("id"));
                                OptionsFragment optionsFragment = new OptionsFragment();
                                optionsFragment.setArguments(args);
                                getFragmentManager().beginTransaction().replace(R.id.fl_fragment,optionsFragment)
                                        .commit();
                            }
                        }
                        if(x1 > x2){
                            tabLayout.getTabAt(1).select();
                            selectedTab = "bonafideCertificateTab";
                            Bundle args = new Bundle();
                            args.putString("name", getArguments().getString("name"));
                            args.putString("userType", getArguments().getString("userType"));
                            args.putString("id", getArguments().getString("id"));
                            documentRequestBonafideCertificateFragment documentRequestBonafideCertificateFragment = new documentRequestBonafideCertificateFragment();
                            documentRequestBonafideCertificateFragment.setArguments(args);
                            getFragmentManager().beginTransaction().replace(R.id.tabDocumentFrameLayout,documentRequestBonafideCertificateFragment)
                                    .commit();
                        }
                        break;
                }
                return true;
            }
        });
    }
}