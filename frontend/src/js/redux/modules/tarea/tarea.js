import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const LISTADO = 'LISTADO';
const CURSOS = 'CURSOS';
const CURSOADMIN = 'CURSOADMIN'

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'tarea',
    '/tarea',
    'tareaForm',
    '/cursos-asignados'
);

export const registroTarea = () => (dispatch, getStore) => {
    const datos = getStore().form.tareaForm.values;
    let activo;
    if (datos.aceptaDocumento === undefined){
        activo = false;
    }else{
        activo = true;
    }
    const data = {
        tituloTarea: datos.tituloTarea,
        descripcion: datos.descripcion,
        aceptaDocumento: activo,
        fechaHoraEntrega: datos.fecha+'T'+datos.hora,
        valorTarea: datos.valorTarea,
        id: datos.id
        
    }
    
    api.post('/tarea', data).then((response) => {
        NotificationManager.success(
            'Tarea creada correctamente',
            'Exito',
            3000
        );
        dispatch(leerAsignacion(datos.id));
        dispatch(push(`/cursos-asignados/${datos.id}/tareas`));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar la tarea',
            'Error',
            0
        );
    })
}

const editarTarea = (id) => (dispatch, getStore) => {
    const datos = getStore().form.tareaForm.values;
    const id = datos.id;
    const data = {

        tituloTarea: datos.tituloTarea,
        descripcion: datos.descripcion,
        aceptaDocumento: datos.aceptaDocumento,
        fechaHoraEntrega: datos.fecha+'T'+datos.hora,
        valorTarea: datos.valorTarea,
        id: datos.id
        
    }
    api.put(`/tarea/${id}`, data).then(() => {
        NotificationManager.success(
            'Tarea modificada correctamente', 
            'Éxito', 
            3000
        );
        //dispatch(leerAsignacion(datos.id));
        //dispatch(push(`/cursos-asignados/${datos.id}/tareas`));
    }).catch(() => {
        NotificationManager.error(
            'Error en la modificación de la tarea', 
            'ERROR', 
            0
        );
    }).finally(() => {
        
    });
};



const leerAsignacion = id => (dispatch) => {
    api.get(`asignacion/${id}`).then((response) => {
        console.log("asignacion: ", response);
        dispatch(initializeForm('tareaForm', response ));
    }).catch(() => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar la asignacion',
            'Error',
            0
        );
    });
};


const leer = id => (dispatch) => {
    api.get(`tarea/${id}`).then((response) => {
    console.log("consulta: ", response);
    let datos = response.fechaHoraEntrega.split('T');
    response.fecha = datos[0];
    let formatoHora = datos[1].split(':');
    response.hora = formatoHora[0]+":"+formatoHora[1];
    dispatch(initializeForm("tareaForm", response));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar la tarea',
            'Error',
            0
        );
    }).finally(() => {
    });
};

export const actions = {
    ...baseReducer.actions,
    registroTarea,
    leerAsignacion,
    editarTarea,
    leer
   
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers,
    
}


export default handleActions(reducers, initialState)