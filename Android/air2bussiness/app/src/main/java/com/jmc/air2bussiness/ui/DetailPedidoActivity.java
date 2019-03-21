package com.jmc.air2bussiness.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.UtilToken;
import com.jmc.air2bussiness.response.PedidoResponse;
import com.jmc.air2bussiness.response.ProductoResponse;

public class DetailPedidoActivity extends AppCompatActivity {


    public static final String ARG_ITEM_ID = "item_id";
    private ImageView btnCat, fotoP;
    private TextView tvIdPedido, tvEstadopedido, tvIdLineapedido, tvNombreProducto, tvCantidad, tvDistribuidorNombre;
    private String jwt, idUser;
    private PedidoResponse pedido;
    private Context ctx;

    public DetailPedidoActivity() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pedido_content_details);
        Toolbar toolbar = findViewById(R.id.toolbar2);

        jwt = UtilToken.getToken(DetailPedidoActivity.this);
        idUser = UtilToken.getToken(getApplicationContext());
        Intent i = getIntent();
        pedido = (PedidoResponse) i.getSerializableExtra("pedido");
        loadItems();
        setItems();

    }

    public void loadItems() {
        ctx = this;

        tvIdPedido = findViewById(R.id.textDetailIdPedido);
        tvEstadopedido = findViewById(R.id.textDetailEstadoPedido);
        tvIdLineapedido = findViewById(R.id.textDetailIdLinea);
        tvNombreProducto = findViewById(R.id.textDetailNombreProducto);
        tvCantidad = findViewById(R.id.textDetailCantidad);
        tvDistribuidorNombre = findViewById(R.id.textDetailDistribuidorPedido);
        System.out.println(pedido);

    }

    public void setItems(){
        tvIdPedido.setText("ID Pedido: "+ pedido.getId());
        tvEstadopedido.setText("Estado: " + pedido.getEstadopedido());
        tvIdLineapedido.setText("ID Linea de Pedido: " + pedido.getLineaspedido().get(0).getId());
        tvNombreProducto.setText("Nombre del Producto: "+ pedido.getLineaspedido().get(0).getProducto().getNombre());
        tvCantidad.setText("cANTIDAD del producto: " +pedido.getLineaspedido().get(0).getCantidad());
        tvDistribuidorNombre.setText("Dimensiones del producto: " + pedido.getDistribuidor().getNombre());


    }
}
