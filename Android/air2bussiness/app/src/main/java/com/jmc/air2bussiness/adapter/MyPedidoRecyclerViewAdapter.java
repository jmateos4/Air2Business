package com.jmc.air2bussiness.adapter;

import android.content.Context;
import android.content.Intent;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.UtilToken;
import com.jmc.air2bussiness.listener.PedidosInteractionListener;
import com.jmc.air2bussiness.response.PedidoResponse;
import com.jmc.air2bussiness.retrofit.generator.ServiceGenerator;
import com.jmc.air2bussiness.retrofit.generator.TipoAutenticacion;
import com.jmc.air2bussiness.retrofit.services.PedidoService;
import com.jmc.air2bussiness.ui.DetailPedidoActivity;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyPedidoRecyclerViewAdapter extends RecyclerView.Adapter<MyPedidoRecyclerViewAdapter.ViewHolder> {

    private final List<PedidoResponse> mValues;
    private final PedidosInteractionListener mListener;
    private Context ctx;
    String jwt;


    public MyPedidoRecyclerViewAdapter(Context ctx, List<PedidoResponse> items, PedidosInteractionListener listener) {
        mValues = items;
        mListener = listener;
        this.ctx = ctx;
    }

    @Override
    public MyPedidoRecyclerViewAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_pedido, parent, false);
        ctx = view.getContext();
        jwt = UtilToken.getToken(ctx);
        return new MyPedidoRecyclerViewAdapter.ViewHolder(view);

    }

    @Override
    public void onBindViewHolder(final MyPedidoRecyclerViewAdapter.ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mIdPedido.setText("ID: " + mValues.get(position).getId());
        holder.estadoPedido.setText(mValues.get(position).getEstadopedido());
        holder.mDistribuidor.setText(mValues.get(position).getDistribuidor().getNombre());
        holder.mFirstLineapedido.setText("Linea de Pedido nº1: " + mValues.get(position).getLineaspedido().get(0).getProducto().getId());
        holder.cantidad.setText("Cantidad: " + String.valueOf(mValues.get(position).getLineaspedido().get(0).getCantidad()));
        holder.nombreProdLinea.setText("Nombre del producto: " + mValues.get(position).getLineaspedido().get(0).getProducto().getNombre());
        holder.itemView.setTag(mValues.get(position));

       holder.constraint.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PedidoService service = ServiceGenerator.createService(PedidoService.class, jwt, TipoAutenticacion.JWT);
                Call<PedidoResponse> callDetails = service.onePedido(holder.mItem.getId());
                callDetails.enqueue(new Callback<PedidoResponse>() {
                    @Override
                    public void onResponse(Call<PedidoResponse> call, Response<PedidoResponse> response) {
                        if(response.isSuccessful()) {
                            PedidoResponse resp = response.body();
                            Intent detailPedidoActivity = new Intent(ctx, DetailPedidoActivity.class);
                            detailPedidoActivity.putExtra("pedido", resp);
                            ctx.startActivity(detailPedidoActivity);
                        }
                    }

                    @Override
                    public void onFailure(Call<PedidoResponse> call, Throwable t) {
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
        public final TextView mIdPedido;
        public final TextView estadoPedido;
        public final TextView mDistribuidor;
        public final TextView mFirstLineapedido;
        public final TextView cantidad;
        public final TextView nombreProdLinea;
        public  final ConstraintLayout constraint;


        public PedidoResponse mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mIdPedido = view.findViewById(R.id.textIdPedido);
            mDistribuidor = view.findViewById(R.id.textDistribuidorPedido);
            mFirstLineapedido = view.findViewById(R.id.textFirstLineaPedido);
            estadoPedido = view.findViewById(R.id.textEstadoPedido);
            constraint = view.findViewById(R.id.constraint);
            cantidad = view.findViewById(R.id.textCantidad);
            nombreProdLinea = view.findViewById(R.id.textNombreProductoLinea);

        }
    }
}
