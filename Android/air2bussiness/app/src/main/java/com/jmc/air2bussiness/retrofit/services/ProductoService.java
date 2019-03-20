package com.jmc.air2bussiness.retrofit.services;

import com.jmc.air2bussiness.response.ProductoResponse;
import com.jmc.air2bussiness.response.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ProductoService {
    @GET("productos")
    Call<ResponseContainer<ProductoResponse>> listProductos();

    @GET("productos/{id}")
    Call<ProductoResponse> oneProducto(@Path("id") String id);

    @DELETE("productos/{id}")
    Call<ResponseContainer<ProductoResponse>> deleteProducto(@Path("id") String id);


}
