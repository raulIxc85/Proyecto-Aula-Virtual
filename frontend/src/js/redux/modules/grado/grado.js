import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_GRADOS= 'GUARDAR_LISTADO_GRADOS';
const GUARDAR_REGISTRO_GRADOS = 'GUARDAR_REGISTRO_GRADOS';
const GUARDAR_LISTADO_NIVELES = 'GUARDAR_LISTADO_NIVELES';

export const listar = () => (dispatch, getStore) => {
    api.get('/grado').then((response)=>{
        dispatch({ type: GUARDAR_LISTADO_GRADOS, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los grados',
            'Error',
            0
        );
    })
}

export const leer = (id) => (dispatch) => {
    api.get(`/grado/${id}`).then((response) => {
        dispatch({type: GUARDAR_REGISTRO_GRADOS, lectura: response });
        dispatch(initializeForm('gradoForm', response ));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar grado',
            'Error',
            0
        );
    })
}

export const registroGrado = () => (dispatch, getStore) => {
    const datos = getStore().form.gradoForm.values;
    const data = {
        descripcion: datos.descripcion,
        nivel: datos.nivel.id
    }
    api.post('/grado', data).then((response) => {
        NotificationManager.success(
            'Grado creado',
            'Exito',
            3000
        );
        dispatch(push('/grados'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar grado',
            'Error',
            0
        );
    })
}

export const modificarGrado = () => (dispatch, getStore) => {
    const datos = getStore().form.gradoForm.values;
    const id = datos.id;
    const formData = {
        id: datos.id,
        descripcion: datos.descripcion,
        nivel: datos.nivel.id
    }
    api.put(`/grado/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Grado modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/grados'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar grado',
            'Error',
            0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/grado/${id}`).then((response) => {
        NotificationManager.success(
            'Grado borrado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al borrar grado',
            'Error',
            0
        );
    })
}

export const listarNiveles = () => (dispatch) => {
    api.get('/nivel').then((response)=>{
        dispatch({ type: GUARDAR_LISTADO_NIVELES, lecturaNivel: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los niveles',
            'Error',
            0
        );
    })
}


export const actions = {
    registroGrado,
    modificarGrado,
    listar,
    leer,
    eliminar,
    listarNiveles
};

export const reducers = {
    [GUARDAR_LISTADO_GRADOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_GRADOS]: (state, { lectura }) => {
        return {
            ...state,
            lectura,
        };
    },
    [GUARDAR_LISTADO_NIVELES]: (state, { lecturaNivel }) => {
        return {
            ...state,
            lecturaNivel,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    lectura: null,
    lecturaNivel: null,
};

export default handleActions(reducers, initialState)