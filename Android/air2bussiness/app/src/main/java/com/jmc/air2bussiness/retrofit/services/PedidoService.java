package com.jmc.air2bussiness.retrofit.services;

import com.jmc.air2bussiness.response.PedidoResponse;
import com.jmc.air2bussiness.response.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface PedidoService {

    @GET("pedidos")
    Call<ResponseContainer<PedidoResponse>> listPedidos();

    @GET("pedidos/{id}")
    Call<PedidoResponse> onePedido(@Path("id") String id);

}
