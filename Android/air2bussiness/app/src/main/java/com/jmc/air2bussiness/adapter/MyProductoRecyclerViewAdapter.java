package com.jmc.air2bussiness.adapter;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.UtilToken;
import com.jmc.air2bussiness.listener.ProductosInteractionListener;
import com.jmc.air2bussiness.response.ProductoResponse;
import com.jmc.air2bussiness.retrofit.generator.ServiceGenerator;
import com.jmc.air2bussiness.retrofit.generator.TipoAutenticacion;
import com.jmc.air2bussiness.retrofit.services.ProductoService;
import com.jmc.air2bussiness.ui.DetailActivity;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyProductoRecyclerViewAdapter extends RecyclerView.Adapter<MyProductoRecyclerViewAdapter.ViewHolder> {

    private final List<ProductoResponse> mValues;
    private final ProductosInteractionListener mListener;
    private Context ctx;
    String jwt;


    public MyProductoRecyclerViewAdapter(Context ctx, List<ProductoResponse> items, ProductosInteractionListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = ctx;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_producto, parent, false);
        ctx = view.getContext();
        jwt = UtilToken.getToken(ctx);
        return new ViewHolder(view);

    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mNombre.setText("Producto: " + mValues.get(position).getNombre());
        holder.mCodRef.setText(mValues.get(position).getCodReferencia());
        holder.mDimensiones.setText(mValues.get(position).getDimensiones());
        holder.mDistribuidor.setText("Distribuidor: " + mValues.get(position).getDistribuidor().getNombre());
        Glide
                .with(ctx)
                .load(mValues.get(position).getFoto())
                .into(new SimpleTarget<Drawable>(){
                    @Override
                    public void onResourceReady(@NonNull Drawable resource, @Nullable Transition<? super Drawable> transition) {
                        holder.mPhoto.setBackground(resource);
                    }
                });

        holder.itemView.setTag(mValues.get(position));
        holder.constraint.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               ProductoService service = ServiceGenerator.createService(ProductoService.class, jwt, TipoAutenticacion.JWT);
                Call<ProductoResponse> callDetails = service.oneProducto(holder.mItem.getId());
                callDetails.enqueue(new Callback<ProductoResponse>() {
                    @Override
                    public void onResponse(Call<ProductoResponse> call, Response<ProductoResponse> response) {
                        if(response.isSuccessful()) {
                            ProductoResponse resp = response.body();
                            Intent detailActivity = new Intent(ctx, DetailActivity.class);
                            detailActivity.putExtra("producto", resp);
                            ctx.startActivity(detailActivity);
                        }
                    }

                    @Override
                    public void onFailure(Call<ProductoResponse> call, Throwable t) {
                        Log.d("Error" , t.getMessage());

                    }
                });
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mNombre;
        public final TextView mCodRef;
        public final TextView mDimensiones;
        public final TextView mDistribuidor;
        public final ImageView mPhoto;
        public  final ConstraintLayout constraint;


        public ProductoResponse mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mPhoto = view.findViewById(R.id.imageProd);
            mNombre = view.findViewById(R.id.textNombre);
            mCodRef = view.findViewById(R.id.textCodRef);
            mDimensiones = view.findViewById(R.id.textDimensiones);
            mDistribuidor = view.findViewById(R.id.textDistribuidor);
            constraint = view.findViewById(R.id.constraint);


        }
    }
}
