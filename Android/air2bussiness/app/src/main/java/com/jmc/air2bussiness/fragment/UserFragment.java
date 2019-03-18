package com.jmc.air2bussiness.fragment;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.jmc.air2bussiness.R;
import com.jmc.air2bussiness.UtilToken;
import com.jmc.air2bussiness.listener.ProfileInteractionListener;
import com.jmc.air2bussiness.response.UserResponse;
import com.jmc.air2bussiness.retrofit.generator.ServiceGenerator;
import com.jmc.air2bussiness.retrofit.generator.TipoAutenticacion;
import com.jmc.air2bussiness.retrofit.services.UserService;
import com.jmc.air2bussiness.ui.NavigationActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class UserFragment extends Fragment {
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    private String mParam1;
    private String mParam2;
    private Context ctx;
    private Button editButton;
    private ProfileInteractionListener mListener;
    private TextView tvNombre, tvEmail, tvTelefono;
    private String idUser;
    private ImageView imageProfile;
    private String jwt;



    public UserFragment() {

    }

    public static UserFragment newInstance(String param1, String param2) {
        UserFragment fragment = new UserFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ctx = getContext();
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View view = inflater.inflate(R.layout.fragment_user, container, false);

        tvNombre = view.findViewById(R.id.textNombreEmpresa);
        tvEmail= view.findViewById(R.id.textEmailEmpresa);
        tvTelefono= view.findViewById(R.id.textTelefonoEmpresa);
        imageProfile= view.findViewById(R.id.imageProfile);
        editButton= view.findViewById(R.id.buttonEditProfile);

        UserService service = ServiceGenerator.createService(UserService.class, UtilToken.getToken(ctx) , TipoAutenticacion.JWT);
        Call<UserResponse> call = service.myself();

        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if(response.isSuccessful()){
                    Glide
                            .with(view.getContext())
                            .load(response.body().getPicture())
                            .into(imageProfile);

                    tvNombre.setText(response.body().getNombre());
                    tvEmail.setText(response.body().getEmail());
                    tvTelefono.setText(response.body().getTelefono());
                    idUser=response.body().getId();
                }
            }


            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {

            }
        });



        editButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showUpdateDialog();
            }
        });


        return view;
    }


    private void showUpdateDialog() {
        DialogFragment dialog = EditProfileFragment.newInstance(UtilToken.getIdUser(this.ctx));
        dialog.show(getFragmentManager(), "EditProfileFragment");
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        this.ctx = context;
        if (context instanceof ProfileInteractionListener) {
            mListener = (ProfileInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }


}
