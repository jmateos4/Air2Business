package com.jmc.air2bussiness.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

public class LineapedidoResponse implements Serializable {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("producto")
    @Expose
    private ProductoResponse producto;
    @SerializedName("cantidad")
    @Expose
    private Integer cantidad;

    public LineapedidoResponse(String id, ProductoResponse producto, Integer cantidad) {
        this.id = id;
        this.producto = producto;
        this.cantidad = cantidad;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ProductoResponse getProducto() {
        return producto;
    }

    public void setProducto(ProductoResponse producto) {
        this.producto = producto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    @Override
    public String toString() {
        return "LineapedidoResponse{" +
                "id='" + id + '\'' +
                ", producto=" + producto +
                ", cantidad=" + cantidad +
                '}';
    }
}
