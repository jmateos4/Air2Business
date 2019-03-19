package com.jmc.air2bussiness.retrofit.services;


import com.jmc.air2bussiness.model.EditUserDTO;
import com.jmc.air2bussiness.response.UserResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface UserService {

    @GET("users/me")
    Call<UserResponse> myself();

    @PUT("users/{id}")
    Call<UserResponse> editMyself(@Path("id") String id,  @Body EditUserDTO edited);

}
