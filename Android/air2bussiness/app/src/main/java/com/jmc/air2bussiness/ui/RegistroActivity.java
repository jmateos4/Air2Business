package com.jmc.air2bussiness.ui;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.UtilToken;
import com.jmc.air2bussiness.response.LoginResponse;
import com.jmc.air2bussiness.model.Registro;
import com.jmc.air2bussiness.retrofit.generator.ServiceGenerator;
import com.jmc.air2bussiness.retrofit.services.LoginService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegistroActivity extends AppCompatActivity {

    Button btnRegistro;
    TextView textLogin;
    EditText name, email, password, phone, address;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_registro);

        btnRegistro = findViewById(R.id.btnSignup);
        textLogin = findViewById(R.id.textSignup);
        name = findViewById(R.id.editUser);
        email = findViewById(R.id.editEmail);
        password = findViewById(R.id.editPwd);
        phone = findViewById(R.id.editPhone);
        address = findViewById(R.id.editAddress);


        btnRegistro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (name.getText().toString().matches("")
                        || email.getText().toString().matches("")
                        || password.getText().toString().matches("")
                        || phone.getText().toString().matches("")
                        || address.getText().toString().matches("")){
                    Toast.makeText(RegistroActivity.this, "Debe introducir todos los campos.", Toast.LENGTH_SHORT).show();
                } else if (!email.getText().toString().matches("^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$")) {
                    Toast.makeText(RegistroActivity.this, "Debe introducir un correo válido.", Toast.LENGTH_SHORT).show();
                } else {

                    // Recoger los datos del formulario
                    String etName = name.getText().toString().trim();
                    String etEmail = email.getText().toString().trim();
                    String etPassword = password.getText().toString().trim();
                    String etPhone = phone.getText().toString().trim();
                    String etAddress = address.getText().toString().trim();

                    Registro registro = new Registro(etName, etEmail, etPassword);

                    LoginService service = ServiceGenerator.createService(LoginService.class);

                    Call<LoginResponse> loginReponseCall = service.doRegister(registro);

                    loginReponseCall.enqueue(new Callback<LoginResponse>() {
                        @Override
                        public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                            if (response.code() == 201) {
                                UtilToken.setToken(RegistroActivity.this, response.body().getToken());
                                UtilToken.setIdUser(RegistroActivity.this, response.body().getUser().getId());
                                //Toast.makeText(RegistroActivity.this, "Sesion Buena", Toast.LENGTH_LONG).show();
                                startActivity(new Intent(RegistroActivity.this, NavigationActivity.class));


                            } else {
                                // error
                                Toast.makeText(RegistroActivity.this, "Error en el registro. Revise los datos introducidos", Toast.LENGTH_LONG).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<LoginResponse> call, Throwable t) {
                            Log.e("NetworkFailure", t.getMessage());
                            Toast.makeText(RegistroActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();

                        }
                    });





                }

            }
        });
        textLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intentRegistro = new Intent(RegistroActivity.this, LoginActivity.class);
                startActivity(intentRegistro);
                finish();
            }
        });

    }
}
