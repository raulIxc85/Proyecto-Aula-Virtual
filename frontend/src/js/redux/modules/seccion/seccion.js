import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_SECCIONES = 'GUARDAR_LISTADO_SECCIONES';
const GUARDAR_REGISTRO_SECCIONES = 'GUARDAR_REGISTRO_SECCIONES';

export const listar = () => (dispatch) => {
    api.get('/seccion').then((response)=>{
        dispatch({ type: GUARDAR_LISTADO_SECCIONES, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar las secciones',
            'Error',
            0
        );
    })
}

export const leer = (id) => (dispatch) => {
    api.get(`/seccion/${id}`).then((response) => {
        dispatch({type: GUARDAR_REGISTRO_SECCIONES, lectura: response });
        dispatch(initializeForm('seccionForm', response ));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar la sección',
            'Error',
            0
        );
    })
}

export const registroSeccion = () => (dispatch, getStore) => {
    const formData = getStore().form.seccionForm.values;
    console.log("datos: ", formData);
    api.post('/seccion', formData).then((response) => {
        NotificationManager.success(
            'Sección creada',
            'Exito',
            3000
        );
        dispatch(push('/secciones'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar la sección',
            'Error',
            0
        );
    })
}

export const modificarSeccion = () => (dispatch, getStore) => {
    const formData = getStore().form.seccionForm.values;
    const id = formData.id;
    api.put(`/seccion/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Sección modificada correctamente',
            'Exito',
            3000
        );
        dispatch(push('/secciones'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar la sección',
            'Error',
            0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/seccion/${id}`).then((response) => {
        NotificationManager.success(
            'Sección borrada correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al borrar la sección',
            'Error',
            0
        );
    })
}

export const actions = {
    registroSeccion,
    modificarSeccion,
    listar,
    leer,
    eliminar,
};

export const reducers = {
    [GUARDAR_LISTADO_SECCIONES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_SECCIONES]: (state, { lectura }) => {
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
