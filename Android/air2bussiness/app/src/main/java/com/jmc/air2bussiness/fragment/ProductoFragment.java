package com.jmc.air2bussiness.fragment;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.jmc.air2bussiness.UtilToken;
import com.jmc.air2bussiness.adapter.MyProductoRecyclerViewAdapter;
import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.listener.ProductosInteractionListener;
import com.jmc.air2bussiness.response.ProductoResponse;
import com.jmc.air2bussiness.response.ResponseContainer;
import com.jmc.air2bussiness.retrofit.generator.ServiceGenerator;
import com.jmc.air2bussiness.retrofit.generator.TipoAutenticacion;
import com.jmc.air2bussiness.retrofit.services.ProductoService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class ProductoFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private ProductosInteractionListener mListener;
    private RecyclerView recyclerView;
    private Context ctx;

    public ProductoFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static ProductoFragment newInstance(int columnCount) {
        ProductoFragment fragment = new ProductoFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_producto_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            recyclerView =  view.findViewById(R.id.listProductos);
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }

            ProductoService service = ServiceGenerator.createService(ProductoService.class, UtilToken.getToken(context), TipoAutenticacion.JWT);

            Call<ResponseContainer<ProductoResponse>> call = service.listProductos();
            call.enqueue(new Callback<ResponseContainer<ProductoResponse>>() {
                @Override
                public void onResponse(Call<ResponseContainer<ProductoResponse>> call, Response<ResponseContainer<ProductoResponse>> response) {
                    if (response.isSuccessful()) {
                        recyclerView.setAdapter(new MyProductoRecyclerViewAdapter(ctx, response.body().getRows(), mListener));
                    } else {
                        // Toast
                    }


                }

                @Override
                public void onFailure(Call<ResponseContainer<ProductoResponse>> call, Throwable t) {
                    // Toast
                    Log.i("onFailure", "error en retrofit");
                }
            });
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        this.ctx = context;
        if (context instanceof ProductosInteractionListener) {
            mListener = (ProductosInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

}
