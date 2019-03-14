package com.jmc.air2bussiness.adapter;

import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.listener.ProductosInteractionListener;
import com.jmc.air2bussiness.response.ProductoResponse;

import java.util.List;


public class MyProductoRecyclerViewAdapter extends RecyclerView.Adapter<MyProductoRecyclerViewAdapter.ViewHolder> {

    private final List<ProductoResponse> mValues;
    private final ProductosInteractionListener mListener;
    private Context ctx;


    public MyProductoRecyclerViewAdapter(Context ctx, List<ProductoResponse> items, ProductosInteractionListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = ctx;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_producto, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mNombre.setText(mValues.get(position).getNombre());
        holder.mCodRef.setText(mValues.get(position).getCodReferencia());
        holder.mDimensiones.setText(mValues.get(position).getDimensiones());
        holder.mDistribuidor.setText(mValues.get(position).getDistribuidor().getNombre());
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
        /*holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ProductoResponse item = (ProductoResponse) v.getTag();
                Intent intent = new Intent(ctx, ProductoDetailActivity.class);
                intent.putExtra(ProductoDetailActivity.ARG_ITEM_ID, item.getId());
                ctx.startActivity(intent);
        }
        });*/
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


        public ProductoResponse mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mPhoto = view.findViewById(R.id.imageProd);
            mNombre = view.findViewById(R.id.textNombre);
            mCodRef = view.findViewById(R.id.textCodRef);
            mDimensiones = view.findViewById(R.id.textDimensiones);
            mDistribuidor = view.findViewById(R.id.textDistribuidor);


        }
    }
}
