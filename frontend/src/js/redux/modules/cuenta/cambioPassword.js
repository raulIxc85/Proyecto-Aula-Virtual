import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const ME = 'LOGIN_ME';

export const setMe = me => ({
    type: ME,
    me,
});


export const cambiarPass = () => (dispatch, getStore) => {
    const formData = getStore().form.cambioPassForm.values;
    api.put('/user/editar', formData).then((response) => {
        NotificationManager.success(
            'Contraseña modificada correctamente',
            'Exito',
            3000
        );
        dispatch(push('/login'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar la contraseña',
            'Error',
            0
        );
    })
}

export const actions = {
    cambiarPass,
     
};

export const reducers = {
    [ME]: (state, { me }) => {
        return {
            ...state,
            me,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
};

export default handleActions(reducers, initialState)
