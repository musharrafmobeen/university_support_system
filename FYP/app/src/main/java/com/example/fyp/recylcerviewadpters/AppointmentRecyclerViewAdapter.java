package com.example.fyp.recylcerviewadpters;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;

import com.example.fyp.BaseUrl;
import com.example.fyp.DownloadImageTask;
import com.example.fyp.requestResultsAndBodies.AppointmentWithPopulatedStudent;
import com.example.fyp.R;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import io.alterac.blurkit.BlurLayout;


public class AppointmentRecyclerViewAdapter extends RecyclerView.Adapter< AppointmentRecyclerViewAdapter.MyViewHolder>{
    List<AppointmentWithPopulatedStudent> appointementList;

    public AppointmentRecyclerViewAdapter(List<AppointmentWithPopulatedStudent>  appointementList) {
        this. appointementList = appointementList;
    }



    @Override
    public AppointmentRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_appointment_recycler_view_adapter, parent, false);
        return new AppointmentRecyclerViewAdapter.MyViewHolder(view);
    }



    @Override
    public void onBindViewHolder(AppointmentRecyclerViewAdapter.MyViewHolder holder, final int position) {
        final AppointmentWithPopulatedStudent appointment = appointementList.get(position);
        holder.studentName.setText(appointment.getStudent().getName());
        holder.appointmentDescription.setText(appointment.getAppointmentDescription());
        holder.blurLayout.startBlur();
        new DownloadImageTask(holder.imageView)
                    .execute(BaseUrl.getBaseUrl()+appointment.getStudent().getStudentImage());
    }

    @Override
    public int getItemCount() {
        return appointementList.size();
    }
    public class MyViewHolder extends RecyclerView.ViewHolder {
        private TextView studentName;
        private TextView appointmentDescription;
        private ImageView imageView;
        BlurLayout blurLayout;
        public MyViewHolder(View itemView) {
            super(itemView);
            blurLayout = (BlurLayout)itemView.findViewById(R.id.appointmentRecyclerViewBlurLayout);
            imageView = (ImageView)itemView.findViewById(R.id.image);
            studentName = itemView.findViewById(R.id.studentNameForAppointment);
            appointmentDescription = itemView.findViewById(R.id.appointmentDescriptionStaff);
        }

    }

}