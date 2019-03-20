package com.jmc.air2bussiness.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class ProductoResponse implements Serializable {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("foto")
    @Expose
    private String foto;
    @SerializedName("nombre")
    @Expose
    private String nombre;
    @SerializedName("codReferencia")
    @Expose
    private String codReferencia;
    @SerializedName("descripcion")
    @Expose
    private String descripcion;
    @SerializedName("dimensiones")
    @Expose
    private String dimensiones;
    @SerializedName("distribuidor")
    @Expose
    private DistribuidorResponse distribuidor;
    @SerializedName("categoria")
    @Expose
    private CategoriaResponse categoria;
    @SerializedName("createdAt")
    @Expose
    private String createdAt;
    @SerializedName("updatedAt")
    @Expose
    private String updatedAt;

    public ProductoResponse(String id, String foto, String nombre, String codReferencia, String descripcion, String dimensiones, DistribuidorResponse distribuidor, CategoriaResponse categoria, String createdAt, String updatedAt) {
        this.id = id;
        this.foto = foto;
        this.nombre = nombre;
        this.codReferencia = codReferencia;
        this.descripcion = descripcion;
        this.dimensiones = dimensiones;
        this.distribuidor = distribuidor;
        this.categoria = categoria;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodReferencia() {
        return codReferencia;
    }

    public void setCodReferencia(String codReferencia) {
        this.codReferencia = codReferencia;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDimensiones() {
        return dimensiones;
    }

    public void setDimensiones(String dimensiones) {
        this.dimensiones = dimensiones;
    }

    public DistribuidorResponse getDistribuidor() {
        return distribuidor;
    }

    public void setDistribuidor(DistribuidorResponse distribuidor) {
        this.distribuidor = distribuidor;
    }

    public CategoriaResponse getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaResponse categoria) {
        this.categoria = categoria;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "ProductoResponse{" +
                "id='" + id + '\'' +
                ", foto='" + foto + '\'' +
                ", nombre='" + nombre + '\'' +
                ", codReferencia='" + codReferencia + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", dimensiones='" + dimensiones + '\'' +
                ", distribuidor=" + distribuidor +
                ", categoria=" + categoria +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                '}';
    }
}
