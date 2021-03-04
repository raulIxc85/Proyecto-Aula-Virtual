import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const LISTADO = 'LISTADO';

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'tarea',
    '/tarea',
    'tareaForm',
    '/cursos-asignados'
);

const registroTarea = () => (dispatch, getStore) => {
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

const editarTarea = () => (dispatch, getStore) => {
    const datos = getStore().form.tareaForm.values;
    const id_asignacion = datos.curso.id
    const idTarea = datos.id;
    const data = {

        tituloTarea: datos.tituloTarea,
        descripcion: datos.descripcion,
        aceptaDocumento: datos.aceptaDocumento,
        fechaHoraEntrega: datos.fecha+'T'+datos.hora,
        valorTarea: datos.valorTarea,
        id: datos.id
        
    }
    api.put(`/tarea/${idTarea}`, data).then(() => {
        NotificationManager.success(
            'Tarea modificada correctamente', 
            'Éxito', 
            3000
        );
        dispatch(leerAsignacion(id_asignacion));
        dispatch(push(`/cursos-asignados/${id_asignacion}/tareas`));
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

/* consulta de tarea */
const leer = id => (dispatch) => {
    api.get(`tarea/${id}`).then((response) => {
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

/* sumatoria de nota para validar */
const sumarNota = id => (dispatch) => {
    api.get('tarea/sumarTarea', {id}).then((response)=>{
        response.sumaTarea = response.valorTarea__sum
        console.log(response);
        dispatch(initializeForm("tareaForm", response));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al sumar las notas',
            'Error',
            0
        );
    })
}

/* Listar tareas */
const listar = id => (dispatch) => {
    api.get('/tarea', {id}).then((response)=>{
        dispatch({ type: LISTADO, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar las tareas',
            'Error',
            0
        );
    })
}

const eliminar = id => (dispatch) => {
    let ruta = window.location.href;
    let data = ruta.split('/');
    let id_asignacion = data[5];
    api.eliminar(`tarea/${id}`).then(() => {
        dispatch(listar(id_asignacion));
        NotificationManager.success(
            'Tarea eliminada', 
            'Éxito', 
            3000
        );
    }).catch(() => {
        NotificationManager.success(
            'Error en el eliminar la tarea', 
            'Éxito', 
            3000
        );
    }).finally(() => {
       
    });
};


export const actions = {
    ...baseReducer.actions,
    listar,
    registroTarea,
    leerAsignacion,
    editarTarea,
    leer,
    sumarNota,
    eliminar
   
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers,
    [LISTADO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    
}


export default handleActions(reducers, initialState)