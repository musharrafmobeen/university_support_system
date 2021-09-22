package com.example.fyp.recylcerviewadpters;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.fyp.BaseUrl;
import com.example.fyp.DownloadImageTask;
import com.example.fyp.requestResultsAndBodies.Employee;
import com.example.fyp.R;
import com.example.fyp.RetrofitInterface;
import com.example.fyp.requestResultsAndBodies.UpdatedEmployeeResult;

import java.util.HashMap;
import java.util.List;

import io.alterac.blurkit.BlurLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class EmployeeRecyclerViewAdapter extends RecyclerView.Adapter<EmployeeRecyclerViewAdapter.MyViewHolder> {
    Button approveBtn;
    Button rejectBtn;
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = BaseUrl.getBaseUrl();
    private List<Employee> employeeList;
    RecyclerView recyclerView ;
    EmployeeRecyclerViewAdapter employeeRecyclerViewAdapter;
    public EmployeeRecyclerViewAdapter(List<Employee> employeeList) {
        this.employeeList = employeeList;

    }

    @Override
    public EmployeeRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.recyclerview_adapter_layout, parent, false);
        return getEmployeesForVerification(view,parent);
    }



    @Override
    public void onBindViewHolder(EmployeeRecyclerViewAdapter.MyViewHolder holder, final int position) {
        final Employee employee = employeeList.get(position);
        String title = employee.getName();
        holder.title.setText(title);
        holder.id.setText("ID : " + employee.getEmployeeID());
        holder.blurLayout.startBlur();
//        holder.image.setBackgroundResource(movie.getImage());
        new DownloadImageTask(holder.image)
                .execute(BaseUrl.getBaseUrl()+employee.getEmployeeImage());
    }

    @Override
    public int getItemCount() {
        return employeeList.size();
    }


    public EmployeeRecyclerViewAdapter.MyViewHolder getEmployeesForVerification(View view,ViewGroup parent) {
        try{
        recyclerView = (RecyclerView) parent.findViewById(R.id.employeeRecyclerView);
        MyViewHolder holder = new MyViewHolder(view, new MyClickListener() {
            @Override
            public void onApprove(int p) {
                // Implement your functionality for onEdit here
                AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
                builder.setCancelable(true);
                builder.setTitle("Approve Employee");
                builder.setMessage("Click The Confirm Button To Approve The Employee.");
                builder.setPositiveButton("Confirm",
                        new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                retrofit = new Retrofit.Builder()
                                        .baseUrl(BASE_URL)
                                        .addConverterFactory(GsonConverterFactory.create())
                                        .build();

                                retrofitInterface = retrofit.create(RetrofitInterface.class);

                                HashMap<String, String> map = new HashMap<>();
                                map.put("updateBy", "_id");
                                map.put("isApproved", "true");

                                Call<UpdatedEmployeeResult> call = retrofitInterface.ApproveEmployee(map, "/employees/" + employeeList.get(p).getId());
                                call.enqueue(new Callback<UpdatedEmployeeResult>() {
                                    @Override
                                    public void onResponse(Call<UpdatedEmployeeResult> call, Response<UpdatedEmployeeResult> response) {

                                        if (response.code() == 200) {
                                            employeeList.remove(p);
                                            employeeRecyclerViewAdapter = new EmployeeRecyclerViewAdapter(employeeList);
                                            RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(view.getContext());
                                            recyclerView.setLayoutManager(layoutManager);
                                            Toast.makeText(view.getContext(), "Employee Has Been Approved",
                                                    Toast.LENGTH_LONG).show();
                                        } else if (response.code() == 409) {
                                            Toast.makeText(view.getContext(), "User Already Registered",
                                                    Toast.LENGTH_LONG).show();
                                        } else if (response.code() == 404) {
                                            Toast.makeText(view.getContext(), "Wrong Credentials",
                                                    Toast.LENGTH_LONG).show();
                                        }

                                    }

                                    @Override
                                    public void onFailure(Call<UpdatedEmployeeResult> call, Throwable t) {
                                        Toast.makeText(view.getContext(), t.getMessage(),
                                                Toast.LENGTH_LONG).show();
                                        Log.d("Error : ", t.getMessage());
                                    }
                                });
                            }
                        });
                builder.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                    }
                });

                AlertDialog dialog = builder.create();
                dialog.show();
            }

            @Override
            public void onReject(int p) {
                // Implement your functionality for onDelete here
                AlertDialog.Builder builder = new AlertDialog.Builder(view.getContext());
                builder.setCancelable(true);
                builder.setTitle("Reject Employee");
                builder.setMessage("Click The Confirm Button To Reject The Employee.");
                builder.setPositiveButton("Confirm",
                        new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                retrofit = new Retrofit.Builder()
                                        .baseUrl(BASE_URL)
                                        .addConverterFactory(GsonConverterFactory.create())
                                        .build();

                                retrofitInterface = retrofit.create(RetrofitInterface.class);

                                HashMap<String, String> map = new HashMap<>();
                                map.put("updateBy", "_id");
                                map.put("isRejected", "true");

                                Call<UpdatedEmployeeResult> call = retrofitInterface.ApproveEmployee(map, "/employees/" + employeeList.get(p).getId());
                                call.enqueue(new Callback<UpdatedEmployeeResult>() {
                                    @Override
                                    public void onResponse(Call<UpdatedEmployeeResult> call, Response<UpdatedEmployeeResult> response) {

                                        if (response.code() == 200) {
                                            employeeList.remove(p);
                                            employeeRecyclerViewAdapter = new EmployeeRecyclerViewAdapter(employeeList);
                                            RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(view.getContext());
                                            recyclerView.setLayoutManager(layoutManager);
                                            Toast.makeText(view.getContext(), "Employee Has Been Rejected",
                                                    Toast.LENGTH_LONG).show();
                                        } else if (response.code() == 409) {
                                            Toast.makeText(view.getContext(), "User Already Registered",
                                                    Toast.LENGTH_LONG).show();
                                        } else if (response.code() == 404) {
                                            Toast.makeText(view.getContext(), "Wrong Credentials",
                                                    Toast.LENGTH_LONG).show();
                                        }

                                    }

                                    @Override
                                    public void onFailure(Call<UpdatedEmployeeResult> call, Throwable t) {
                                        Toast.makeText(view.getContext(), t.getMessage(),
                                                Toast.LENGTH_LONG).show();
                                        Log.d("Error : ", t.getMessage());
                                    }
                                });
                            }
                        });
                builder.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                    }
                });

                AlertDialog dialog = builder.create();
                dialog.show();
            }
        });

        return holder;
    }catch(Exception e){
            Toast.makeText(view.getContext(), e.getMessage(),
                    Toast.LENGTH_LONG).show();
            return null;
    }
    }

    public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        private TextView title;
        private ImageView image;
        private TextView id;
        private CardView cardView;
        MyClickListener listener;
        BlurLayout blurLayout;
        public MyViewHolder(View itemView,MyClickListener listener) {
            super(itemView);
            title = itemView.findViewById(R.id.title);
            id = itemView.findViewById(R.id.IdRecycler);
            image = itemView.findViewById(R.id.image);
            cardView = itemView.findViewById(R.id.carView);
            approveBtn = (Button) itemView.findViewById(R.id.approveBtn);
            rejectBtn = (Button) itemView.findViewById(R.id.rejectBtn);
            blurLayout = (BlurLayout)itemView.findViewById(R.id.verificationsBlurLayout);
            this.listener = listener;
            approveBtn.setOnClickListener(this);
            rejectBtn.setOnClickListener(this);

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