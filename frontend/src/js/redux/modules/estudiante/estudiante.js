import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_ESTUDIANTES = 'GUARDAR_LISTADO_ESTUDIANTES';
const GUARDAR_REGISTRO_ESTUDIANTES = 'GUARDAR_REGISTRO_ESTUDIANTES';

export const listar = () => (dispatch) => {
    api.get('/estudiante').then((response)=>{
        dispatch({ type: GUARDAR_LISTADO_ESTUDIANTES, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los estudiantes',
            'Error',
            0
        );
    })
}

export const leer = (id) => (dispatch) => {
    api.get(`/estudiante/${id}`).then((response) => {
        console.log("Response: ", response);
        dispatch({type: GUARDAR_REGISTRO_ESTUDIANTES, lectura: response });
        dispatch(initializeForm('estudiante', response ));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar el estudiante',
            'Error',
            0
        );
    })
}

export const registroEstudiante = () => (dispatch, getStore) => {
    const data = getStore().form.estudiante.values;
    const formData = {
        username: data.username,
        password: data.password,
        profile: {
            nombres: data.nombres,
            apellidos: data.apellidos,
            direccion: data.direccion,
            telefono: data.telefono,
            gender: data.gender,
            rol: data.rol,
            estudiante: {
                carnet: data.carnet,
                nombreContacto: data.nombreContacto,
                direccionContacto: data.direccionContacto,
                telefonoContacto: data.telefonoContacto
            }
        }
        
        
    }
    api.post('/estudiante', formData).then((response) => {
        NotificationManager.success(
            'Estudiante creado',
            'Exito',
            3000
        );
        dispatch(push('/estudiantes'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar el estudiante',
            'Error',
            0
        );
    })
}

export const modificarEstudiante = () => (dispatch, getStore) => {
    const formData = getStore().form.rol.values;
    const id = formData.id;
    api.put(`/estudiante/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Estudiante modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/estudiantes'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar el estudiante',
            'Error',
            0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/estudiante/${id}`).then((response) => {
        NotificationManager.success(
            'Estudiante borrado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al borrar el estudiante',
            'Error',
            0
        );
    })
}

export const actions = {
    registroEstudiante,
    modificarEstudiante,
    listar,
    leer,
    eliminar,
};

export const reducers = {
    [GUARDAR_LISTADO_ESTUDIANTES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_ESTUDIANTES]: (state, { lectura }) => {
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