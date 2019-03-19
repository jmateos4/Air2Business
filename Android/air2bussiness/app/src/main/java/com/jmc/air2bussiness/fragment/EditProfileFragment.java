package com.jmc.air2bussiness.fragment;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v7.app.AlertDialog;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import com.bumptech.glide.Glide;
import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.UtilToken;
import com.jmc.air2bussiness.listener.ProfileInteractionListener;
import com.jmc.air2bussiness.response.UserResponse;
import com.jmc.air2bussiness.retrofit.generator.ServiceGenerator;
import com.jmc.air2bussiness.retrofit.generator.TipoAutenticacion;
import com.jmc.air2bussiness.retrofit.services.UserService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class EditProfileFragment extends DialogFragment {

    private static final String ARG_ID_USUARIO = "idUser";
    private int idEditProfile;
    private EditText etNombre, etEmail, etTelefono;
    Context ctx;


    private ProfileInteractionListener mListener;

    public EditProfileFragment() {
        // Required empty public constructor
    }


    public static EditProfileFragment newInstance(String idUsuario) {
        EditProfileFragment fragment = new EditProfileFragment();
        Bundle args = new Bundle();
        args.putString(ARG_ID_USUARIO, idUsuario);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            idEditProfile = getArguments().getInt(ARG_ID_USUARIO);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_edit_profile, container, false);
    }

    public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

        UserService service = ServiceGenerator.createService(UserService.class, UtilToken.getToken(ctx) , TipoAutenticacion.JWT);
        Call<UserResponse> call = service.myself();

        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if(response.isSuccessful()){
                    etNombre.setText(response.body().getNombre());
                    etEmail.setText(response.body().getEmail());
                    etTelefono.setText(response.body().getTelefono());
                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {

            }
        });

        builder.setMessage("")
                .setTitle("Editar Datos Personales")
                .setPositiveButton("Guardar", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        UserService service = ServiceGenerator.createService(UserService.class, UtilToken.getToken(ctx) , TipoAutenticacion.JWT);
                        Call<UserResponse> call = service.editMyself(UtilToken.getIdUser(ctx));

                        call.enqueue(new Callback<UserResponse>() {
                            @Override
                            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                                if(response.isSuccessful()){


                                    etNombre.setText(response.body().getNombre());
                                    etEmail.setText(response.body().getEmail().toString());
                                    etTelefono.setText(response.body().getTelefono().toString());
                                }
                            }


                            @Override
                            public void onFailure(Call<UserResponse> call, Throwable t) {

                            }
                        });


                    }
                })
                .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {

                    }
                });

        LayoutInflater inflater = getActivity().getLayoutInflater();
        View v = inflater.inflate(R.layout.fragment_edit_profile, null);

        etNombre = v.findViewById(R.id.editNombreEmpresa);
        etEmail = v.findViewById(R.id.editEmailEmpresa);
        etTelefono = v.findViewById(R.id.editTelefonoEmpresa);

        builder.setView(v);
        return builder.create();
    }

    @Override
    public void onAttach(Context context) {
        ctx = context;
        super.onAttach(context);
        this.ctx = context;
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

}
