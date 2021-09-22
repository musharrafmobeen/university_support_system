package com.example.fyp.recylcerviewadpters;

import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.fyp.requestResultsAndBodies.Announcement;
import com.example.fyp.R;

import java.util.List;

import io.alterac.blurkit.BlurLayout;


public class AnnouncementRecyclerViewAdapter  extends RecyclerView.Adapter<AnnouncementRecyclerViewAdapter.MyViewHolder> {
    private List<Announcement> announcementList;

    public AnnouncementRecyclerViewAdapter(List<Announcement> announcementList) {
        this.announcementList = announcementList;
    }


    @Override
    public AnnouncementRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_announcement_recycler_view_adapter, parent, false);
        return new AnnouncementRecyclerViewAdapter.MyViewHolder(view);
    }



    @Override
    public void onBindViewHolder(AnnouncementRecyclerViewAdapter.MyViewHolder holder, final int position) {
        final Announcement announcement = announcementList.get(position);
        holder.date.setText(announcement.getDateCreated());
        holder.announcement.setText(announcement.getAnnouncement());
        holder.blurLayout.startBlur();
//        holder.image.setBackgroundResource(movie.getImage());
    }

    @Override
    public int getItemCount() {
        return announcementList.size();
    }
    public class MyViewHolder extends RecyclerView.ViewHolder {
        private TextView date;
        private TextView announcement;
        BlurLayout blurLayout;
        public MyViewHolder(View itemView) {
            super(itemView);
            blurLayout = (BlurLayout)itemView.findViewById(R.id.announcmentRecyclerViewBlurLayout);
            date = itemView.findViewById(R.id.dateAnnouncement);
            announcement = itemView.findViewById(R.id.Announcement);
        }

    }
}