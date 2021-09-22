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

import com.example.fyp.recylcerviewadpters.AnnouncementRecyclerViewAdapter;
import com.example.fyp.requestResultsAndBodies.Announcement;
import com.example.fyp.requestResultsAndBodies.AnnouncementsResult;

import org.jetbrains.annotations.NotNull;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class AnnouncementViewFragment extends Fragment {
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    String  url = "";
    RecyclerView recyclerView ;
    AnnouncementRecyclerViewAdapter recyclerViewAdapter;
    List<Announcement> announcementList;
    Button approveBtn;
    public AnnouncementViewFragment() {
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
        return inflater.inflate(R.layout.fragment_announcement_view, container, false);
    }

    @Override
    public void onViewCreated(@NonNull @NotNull View view, @Nullable @org.jetbrains.annotations.Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        try {
            getActivity().findViewById(R.id.loadingPanel).setVisibility(View.GONE);
            getAnnouncements(view);
            view.setFocusableInTouchMode(true);
            view.requestFocus();
            view.setOnKeyListener(new View.OnKeyListener() {
                @Override
                public boolean onKey(View v, int keyCode, KeyEvent event) {
                    if (keyCode == android.view.KeyEvent.KEYCODE_BACK && event.getAction() == android.view.KeyEvent.ACTION_UP) {

                        Bundle args = new Bundle();
                        args.putString("name", getArguments().getString("name"));
                        args.putString("userType", getArguments().getString("user"));
                        args.putString("id", getArguments().getString("id"));
                        args.putString("image", getArguments().getString("image"));
                        OptionsFragment optionsFragment = new OptionsFragment();
                        optionsFragment.setArguments(args);
                        getFragmentManager().beginTransaction().replace(R.id.fl_fragment,optionsFragment)
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

    private void getAnnouncements(View view){
        recyclerView = (RecyclerView)view.findViewById(R.id.announcementRecyclerView);
        String userType = getArguments().getString("userType");
        if(userType.equals("Staff")){
            url = "/announcements/staffAnnouncements";
        }
        else if(userType.equals("Student")){
            url = "/announcements/studentAnnouncements";
        }
        else{
            url = "/announcements/visibleToAllAnnouncements";
        }
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);
        Call<AnnouncementsResult> call = retrofitInterface.getAllAnnouncements(url);

        call.enqueue(new Callback<AnnouncementsResult>() {
            @Override
            public void onResponse(Call<AnnouncementsResult> call, Response<AnnouncementsResult> response) {
                if (response.code() == 200) {
                    announcementList  = response.body().getAnnouncements();
                    recyclerViewAdapter = new AnnouncementRecyclerViewAdapter(announcementList);
                    RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(getContext());
                    recyclerView.setLayoutManager(layoutManager);
                    recyclerView.setAdapter(recyclerViewAdapter);

                    Toast.makeText(getContext(), "Announcements",
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
            public void onFailure(Call<AnnouncementsResult> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(),
                        Toast.LENGTH_LONG).show();
            }
        });
    }
}