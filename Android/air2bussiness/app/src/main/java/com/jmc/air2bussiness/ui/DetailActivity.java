package com.jmc.air2bussiness.ui;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.UtilToken;
import com.jmc.air2bussiness.response.ProductoResponse;

public class DetailActivity extends AppCompatActivity {

        public static final String ARG_ITEM_ID = "item_id";
        private ImageView btnCat, fotoP;
        private TextView tvNombre, tvDistribuidor, tvCategoria, tvCodRef, tvDescripcion, tvDimensiones;
        private String jwt, idUser;
        private ProductoResponse producto;
        private Context ctx;

        public DetailActivity() {
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.content_details);
            Toolbar toolbar = findViewById(R.id.toolbar);
            jwt = UtilToken.getToken(DetailActivity.this);
            idUser = UtilToken.getToken(getApplicationContext());
            Intent i = getIntent();
            producto = (ProductoResponse) i.getSerializableExtra("producto");
            loadItems();
            setItems();

        }

        public void loadItems() {
            ctx = this;

            tvNombre = findViewById(R.id.textDetailNombre);
            tvCategoria = findViewById(R.id.textDetailCategoria);
            tvDistribuidor = findViewById(R.id.textDetailDistribuidor);
            tvCodRef = findViewById(R.id.textDetailCodRef);
            tvDescripcion = findViewById(R.id.textDetailDescripcion);
            tvDimensiones = findViewById(R.id.textDetailDimensiones);
            fotoP = findViewById(R.id.details_photo);
            System.out.println(producto);

        }

        public void setItems(){
            tvNombre.setText(producto.getNombre());
            tvCategoria.setText(producto.getCategoria().getNombre());
            tvDistribuidor.setText(producto.getDistribuidor().getNombre());
            tvCodRef.setText(producto.getCodReferencia());
            tvDescripcion.setText(producto.getDescripcion());
            tvDimensiones.setText(producto.getDimensiones());
            Glide.with(this).load(producto.getFoto())
                    .centerInside()
                    .into(fotoP);

        }

}
