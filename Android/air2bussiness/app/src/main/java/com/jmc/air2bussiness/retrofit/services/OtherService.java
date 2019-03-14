package com.jmc.air2bussiness.retrofit.services;


import com.jmc.air2bussiness.response.ResponseContainer;
import com.jmc.air2bussiness.model.User;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface OtherService {


    @GET("/users")
    Call<ResponseContainer<User>> listUsers();

    @GET("/users/{id}")
    Call<User> getUser(@Path("id") Long id);

}
