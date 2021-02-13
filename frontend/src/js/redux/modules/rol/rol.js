import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_ROLES = 'GUARDAR_LISTADO_ROLES';
const GUARDAR_REGISTRO_ROLES = 'GUARDAR_REGISTRO_ROLES';

export const listar = () => (dispatch) => {
    api.get('/rol').then((response)=>{
        dispatch({ type: GUARDAR_LISTADO_ROLES, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los roles',
            'Error',
            0
        );
    })
}

export const leer = (id) => (dispatch) => {
    api.get(`/rol/${id}`).then((response) => {
        console.log("Response: ", response);
        dispatch({type: GUARDAR_REGISTRO_ROLES, lectura: response });
        dispatch(initializeForm('rol', response ));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar rol',
            'Error',
            0
        );
    })
}

export const registroRol = () => (dispatch, getStore) => {
    const formData = getStore().form.rol.values;
    api.post('/rol', formData).then((response) => {
        NotificationManager.success(
            'Rol creado',
            'Exito',
            3000
        );
        dispatch(push('/roles'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar el rol',
            'Error',
            0
        );
    })
}

export const modificarRol = () => (dispatch, getStore) => {
    const formData = getStore().form.rol.values;
    const id = formData.id;
    api.put(`/rol/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Rol modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/roles'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar rol',
            'Error',
            0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/rol/${id}`).then((response) => {
        NotificationManager.success(
            'Rol borrado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al borrar rol',
            'Error',
            0
        );
    })
}

export const actions = {
    registroRol,
    modificarRol,
    listar,
    leer,
    eliminar,
};

export const reducers = {
    [GUARDAR_LISTADO_ROLES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_ROLES]: (state, { lectura }) => {
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
