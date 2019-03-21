package com.jmc.air2bussiness.retrofit.services;

import com.jmc.air2bussiness.model.AddLineapedidoDTO;
import com.jmc.air2bussiness.response.LineapedidoResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;
import retrofit2.http.PUT;

public interface LineapedidoService {

    @POST("lineapedido")
    Call<LineapedidoResponse> createLineaPedido(@Body AddLineapedidoDTO lineapedido);
}
