package com.example.fyp.recylcerviewadpters;

        import android.view.LayoutInflater;
        import android.view.View;
        import android.view.ViewGroup;
        import android.widget.TextView;

        import androidx.cardview.widget.CardView;
        import androidx.recyclerview.widget.RecyclerView;

        import com.example.fyp.BaseUrl;
        import com.example.fyp.requestResultsAndBodies.Grievance;
        import com.example.fyp.R;
        import com.example.fyp.RetrofitInterface;

        import java.util.List;

        import io.alterac.blurkit.BlurLayout;
        import retrofit2.Retrofit;

public class GrievanceRecyclerViewAdapter extends RecyclerView.Adapter<GrievanceRecyclerViewAdapter.MyViewHolder> {
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    private List<Grievance> grievanceList;
    RecyclerView recyclerView ;
    GrievanceRecyclerViewAdapter employeeRecyclerViewAdapter;
    public GrievanceRecyclerViewAdapter(List<Grievance> grievanceList) {
        this.grievanceList =grievanceList;

    }

    @Override
    public GrievanceRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.grivance_recyclerview_adapter_layout, parent, false);
        return new MyViewHolder(view);
    }



    @Override
    public void onBindViewHolder(GrievanceRecyclerViewAdapter.MyViewHolder holder, final int position) {
        final Grievance grievance = grievanceList.get(position);
        holder.title.setText(grievance.getTitle());
        holder.ticketNo.setText(""+grievance.getTicket());
        holder.status.setText(grievance.getStatus());
        holder.blurLayout.startBlur();
//        holder.image.setBackgroundResource(movie.getImage());
    }

    @Override
    public int getItemCount() {
        return grievanceList.size();
    }
    public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        private TextView title;
        //        private ImageView image;
        private TextView ticketNo;
        private TextView status;
        private CardView cardView;
        MyClickListener listener;
        BlurLayout blurLayout;
        public MyViewHolder(View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.title);
            ticketNo = itemView.findViewById(R.id.ticketNO);
            status = itemView.findViewById(R.id.status);
            blurLayout = (BlurLayout)itemView.findViewById(R.id.grievanceRecyclerBlurLayout);
//            image = itemView.findViewById(R.id.image);
            cardView = itemView.findViewById(R.id.carView);
//            approveBtn = (Button) itemView.findViewById(R.id.approveBtn);
//            rejectBtn = (Button) itemView.findViewById(R.id.rejectBtn);
//            this.listener = listener;
//            approveBtn.setOnClickListener(this);
//            rejectBtn.setOnClickListener(this);

        }

        @Override
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.approveBtn:
                    listener.onApprove(this.getLayoutPosition());
                    break;
                case R.id.rejectBtn:
                    listener.onReject(this.getLayoutPosition());
                    break;
                default:
                    break;
            }
        }

    }
    public interface MyClickListener {
        void onApprove(int p);
        void onReject(int p);
    }
}