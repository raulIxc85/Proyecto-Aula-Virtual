import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LOADER = 'LOGIN_LOADER';

export const constants = {
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});
// ------------------------------------
// Actions
// ------------------------------------

export const update = () => (dispatch, getStore) => {
    const datos = getStore().form.profile.values;
    dispatch(setLoader(true));
    const data = {
        profile: {
            nombres: datos.profile.nombres,
            apellidos: datos.profile.apellidos,
            direccion: datos.profile.direccion,
            telefono: datos.profile.telefono,
            gender: datos.profile.gender,
            rol: datos.profile.rol,
        }
    }
    api.put('user/update_me', data).then((response) => {
        NotificationManager.success(
            'Datos actualizados correctamente', 
            'Exito', 
            3000
        );
    }).catch(() => {
        NotificationManager.error(
            'Credenciales incorrectas, vuelva a intentar',
            'ERROR', 
            0
        );
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const actions = {
    update,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);
