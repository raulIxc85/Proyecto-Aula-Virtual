import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_PROFESIONES = 'GUARDAR_LISTADO_PROFESIONES';
const GUARDAR_REGISTRO_PROFESIONES = 'GUARDAR_REGISTRO_PROFESIONES';

export const listar = () => (dispatch) => {
    api.get('/profesion').then((response)=>{
        dispatch({ type: GUARDAR_LISTADO_PROFESIONES, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar las profesiones',
            'Error',
            0
        );
    })
}

export const leer = (id) => (dispatch) => {
    api.get(`/profesion/${id}`).then((response) => {
        dispatch({type: GUARDAR_REGISTRO_PROFESIONES, lectura: response });
        dispatch(initializeForm('profesion', response ));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar profesión',
            'Error',
            0
        );
    })
}

export const registroProfesion = () => (dispatch, getStore) => {
    const formData = getStore().form.profesion.values;
    api.post('/profesion', formData).then((response) => {
        NotificationManager.success(
            'Profesion creado',
            'Exito',
            3000
        );
        dispatch(push('/profesiones'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar la profesion',
            'Error',
            0
        );
    })
}

export const modificarProfesion = () => (dispatch, getStore) => {
    const formData = getStore().form.profesion.values;
    const id = formData.id;
    api.put(`/profesion/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Profesion modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/profesiones'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar profesión',
            'Error',
            0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/profesion/${id}`).then((response) => {
        NotificationManager.success(
            'Profesión borrado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al borrar profesión',
            'Error',
            0
        );
    })
}

export const actions = {
    registroProfesion,
    modificarProfesion,
    listar,
    leer,
    eliminar,
};

export const reducers = {
    [GUARDAR_LISTADO_PROFESIONES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_PROFESIONES]: (state, { lectura }) => {
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
