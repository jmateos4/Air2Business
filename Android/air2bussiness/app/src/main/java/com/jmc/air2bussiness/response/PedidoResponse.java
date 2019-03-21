package com.jmc.air2bussiness.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.List;

public class PedidoResponse implements Serializable {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("lineaspedido")
    @Expose
    private List<LineapedidoResponse> lineaspedido = null;
    @SerializedName("estadopedido")
    @Expose
    private String estadopedido;
    @SerializedName("distribuidor")
    @Expose
    private DistribuidorResponse distribuidor;
    @SerializedName("empresa")
    @Expose
    private UserResponse empresa;

    public PedidoResponse() {
    }

    public PedidoResponse(String id, List<LineapedidoResponse> lineaspedido, String estadopedido, DistribuidorResponse distribuidor, UserResponse empresa) {
        this.id = id;
        this.lineaspedido = lineaspedido;
        this.estadopedido = estadopedido;
        this.distribuidor = distribuidor;
        this.empresa = empresa;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<LineapedidoResponse> getLineaspedido() {
        return lineaspedido;
    }

    public void setLineaspedido(List<LineapedidoResponse> lineaspedido) {
        this.lineaspedido = lineaspedido;
    }

    public String getEstadopedido() {
        return estadopedido;
    }

    public void setEstadopedido(String estadopedido) {
        this.estadopedido = estadopedido;
    }

    public DistribuidorResponse getDistribuidor() {
        return distribuidor;
    }

    public void setDistribuidor(DistribuidorResponse distribuidor) {
        this.distribuidor = distribuidor;
    }

    public UserResponse getEmpresa() {
        return empresa;
    }

    public void setEmpresa(UserResponse empresa) {
        this.empresa = empresa;
    }

    @Override
    public String toString() {
        return "PedidoResponse{" +
                "id='" + id + '\'' +
                ", lineaspedido=" + lineaspedido +
                ", estadopedido='" + estadopedido + '\'' +
                ", distribuidor=" + distribuidor +
                ", empresa=" + empresa +
                '}';
    }
}
