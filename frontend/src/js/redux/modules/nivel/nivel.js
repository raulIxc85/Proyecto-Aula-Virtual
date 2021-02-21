import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_NIVELES = 'GUARDAR_LISTADO_NIVELES';
const GUARDAR_REGISTRO_NIVELES = 'GUARDAR_REGISTRO_NIVELES';

export const listar = () => (dispatch) => {
    api.get('/nivel').then((response)=>{
        dispatch({ type: GUARDAR_LISTADO_NIVELES, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los niveles',
            'Error',
            0
        );
    })
}

export const leer = (id) => (dispatch) => {
    api.get(`/nivel/${id}`).then((response) => {
        dispatch({type: GUARDAR_REGISTRO_NIVELES, lectura: response });
        dispatch(initializeForm('nivelForm', response ));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar nivel',
            'Error',
            0
        );
    })
}

export const registroNivel = () => (dispatch, getStore) => {
    const formData = getStore().form.nivelForm.values;
    api.post('/nivel', formData).then((response) => {
        NotificationManager.success(
            'Nivel creado',
            'Exito',
            3000
        );
        dispatch(push('/niveles'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar el nivel',
            'Error',
            0
        );
    })
}

export const modificarNivel = () => (dispatch, getStore) => {
    const formData = getStore().form.nivelForm.values;
    const id = formData.id;
    api.put(`/nivel/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Nivel modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/niveles'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar nivel',
            'Error',
            0
        );
    })
}


export const actions = {
    registroNivel,
    modificarNivel,
    listar,
    leer,    
};

export const reducers = {
    [GUARDAR_LISTADO_NIVELES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_NIVELES]: (state, { lectura }) => {
        return {
            ...state,
            lectura,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    lectura: null,
};

export default handleActions(reducers, initialState)
