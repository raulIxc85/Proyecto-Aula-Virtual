//Recuperar Contraseña
import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";


const revisarCorreo = () => (dispatch, getStore) => {
    const formData = getStore().form.recuperarPassForm.values;
    let ruta = window.location.href;
    let url = ruta.split('/');
    let urlToken = url[0]+'/'+url[1]+'/'+url[2]+'/'+url[3]+'/validar_token/';
    const data = {
        'correo': formData.correo,
        'url': urlToken
    }
    api.put('/user/verificar_correo', data).then((response) => {
        
        dispatch(push('/confirmacion-envio'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Correo electrónico no existe',
            'Error',
            0
        );
    })
}

const cambiarPassToken = () => (dispatch, getStore) => {
    const formData = getStore().form.cambiarPassTokenForm.values;
    let ruta = window.location.href;
    let url = ruta.split('/');
    let id = url[5];
    let token = url[6].split('=');
    const data = {
        'password': formData.password,
        'token': token[1],
        'id': id
    }
    api.put('/user/cambiar_pass_token', data).then((response) => {
        dispatch(push('/login'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al cambiar la contraseña',
            'Error',
            0
        );
    })
}

export const actions = {
    revisarCorreo,
    cambiarPassToken
};

export const reducers = {
   
};

export const initialState = {
    
};

export default handleActions(reducers, initialState)
