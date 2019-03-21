package com.jmc.air2bussiness.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class AddLineapedidoDTO {

    @SerializedName("producto")
    @Expose
    private String producto;
    @SerializedName("cantidad")
    @Expose
    private String cantidad;
}
