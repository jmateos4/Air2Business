package com.jmc.air2bussiness.ui;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;

import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.fragment.PedidoFragment;
import com.jmc.air2bussiness.fragment.ProductoFragment;
import com.jmc.air2bussiness.fragment.UserFragment;
import com.jmc.air2bussiness.listener.PedidosInteractionListener;
import com.jmc.air2bussiness.listener.ProductosInteractionListener;
import com.jmc.air2bussiness.listener.ProfileInteractionListener;

public class NavigationActivity extends AppCompatActivity implements ProductosInteractionListener, ProfileInteractionListener , PedidosInteractionListener {

  private TextView mTextMessage;

  private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
    = new BottomNavigationView.OnNavigationItemSelectedListener() {

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
      Fragment f = null;

      switch (item.getItemId()) {
        case R.id.navigation_prod:
            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.contenedor, new ProductoFragment())
                    .commit();
          break;
        case R.id.navigation_cart:
          getSupportFragmentManager()
                  .beginTransaction()
                  .replace(R.id.contenedor, new PedidoFragment())
                  .commit();
          break;
        case R.id.navigation_profile:
          getSupportFragmentManager()
                  .beginTransaction()
                  .replace(R.id.contenedor, new UserFragment())
                  .commit();
          break;
      }

      return false;
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_navigation);

    getSupportFragmentManager()
      .beginTransaction()
      .add(R.id.contenedor, new ProductoFragment())
      .commit();

      BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
      navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);

  }
}
