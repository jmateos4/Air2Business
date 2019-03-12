package com.jmc.air2bussiness.retrofit.services;


import com.jmc.air2bussiness.model.LoginResponse;
import com.jmc.air2bussiness.model.Registro;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface LoginService {

    @POST("/auth")
    Call<LoginResponse> doLogin(@Header("Authorization") String authorization);

    // @POST("/auth")
    // Call<LoginResponse> doLogin();


    // @POST("/users")
    // Call<LoginResponse> doRegister(@Query("access_token") String access_token,
    //                               @Body Registro registro);

    @POST("/users")
    Call<LoginResponse> doRegister(@Body Registro registro);




}
