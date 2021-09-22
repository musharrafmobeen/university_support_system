package com.example.fyp;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.Menu;
import android.view.MotionEvent;


public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TitleScreenFragment titleFragment = new TitleScreenFragment();
        getSupportFragmentManager().beginTransaction().add(R.id.fl_fragment,titleFragment)
                .commit();
    }

}