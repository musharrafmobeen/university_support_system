package com.example.fyp;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;


public class TitleScreenFragment extends Fragment {

    float x1,x2,y1,y2;
//    Button btn;
    public TitleScreenFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(@Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_title_screen, container, false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        touchListener(view);
        getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
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
                            TitleScreenFragment titleFragment = new TitleScreenFragment();
                            getFragmentManager().beginTransaction().add(R.id.fl_fragment,titleFragment)
                                    .commit();
                        }
                        if(x1 > x2){
                            SignInFragment signInFragment = new SignInFragment();
                            getFragmentManager().beginTransaction()
                                    .replace(R.id.fl_fragment,signInFragment)
                                    .commit();
                        }
                        break;
                }
                return true;
            }
        });
    }

}