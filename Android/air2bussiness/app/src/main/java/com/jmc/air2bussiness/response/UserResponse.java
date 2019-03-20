package com.jmc.air2bussiness.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class UserResponse implements Serializable {
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("telefono")
    @Expose
    private String telefono;
    @SerializedName("picture")
    @Expose
    private String picture;
    @SerializedName("createdAt")
    @Expose
    private String createdAt;

    public UserResponse(String id, String nombre, String email, String telefono, String picture, String createdAt) {
        this.id = id;
        this.name = nombre;
        this.email = email;
        this.telefono = telefono;
        this.picture = picture;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return name;
    }

    public void setNombre(String nombre) {
        this.name = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "UserResponse{" +
                "id='" + id + '\'' +
                ", nombre='" + name + '\'' +
                ", email='" + email + '\'' +
                ", telefono='" + telefono + '\'' +
                ", picture='" + picture + '\'' +
                ", createdAt='" + createdAt + '\'' +
                '}';
    }
}
