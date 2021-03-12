import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const LISTADO = 'LISTADO';
const ARCHIVO = 'ARCHIVO';
const LISTADO_TAREAS_ENTREGADAS = 'LISTADO_TAREAS_ENTREGADAS';

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'tarea',
    '/tarea',
    'tareaForm',
    '/cursos-asignados'
);

const registroTarea = (datos={}, attachments=[]) => (dispatch) => {
    let ruta = window.location.href;
    let url = ruta.split('/');
    let id_asignacion = url[5];
    const data = {
        tituloTarea: datos.tituloTarea,
        descripcion: datos.descripcion,
        fechaHoraEntrega: datos.fecha+'T'+datos.hora,
        valorTarea: datos.valorTarea,
        id: id_asignacion
    }
    api.postAttachments('/tarea', data, attachments).then((response) => {
        NotificationManager.success(
            'Tarea creada correctamente',
            'Exito',
            3000
        );
        dispatch(leerAsignacion(id_asignacion));
        dispatch(push(`/cursos-asignados/${id_asignacion}/tareas`));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar la tarea',
            'Error',
            0
        );
    })
}

const editarTarea = (datos={}, attachments) => (dispatch) => {
    let ruta = window.location.href;
    let url = ruta.split('/');
    let id_asignacion = url[5];
    let idTarea = datos.id;
    const data = {

        tituloTarea: datos.tituloTarea,
        descripcion: datos.descripcion,
        fechaHoraEntrega: datos.fecha+'T'+datos.hora,
        valorTarea: datos.valorTarea,
        id: idTarea
        
    }
    api.putAttachments(`/tarea/${idTarea}`, data, attachments).then((response) => {
        NotificationManager.success(
            'Tarea modificada correctamente', 
            'Éxito', 
            3000
        );
        dispatch(leerAsignacion(id_asignacion));
        dispatch(push(`/cursos-asignados/${id_asignacion}/tareas`));
    }).catch((error) => {
        console.log("error: ", error);
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
        dispatch({ type: ARCHIVO, archivo: response });
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
    let datos = ruta.split('/');
    let id_asignacion = datos[5];
    api.eliminar(`tarea/${id}`).then(() => {
        dispatch(listar(id_asignacion));
        NotificationManager.success(
            'Tarea eliminada', 
            'Éxito', 
            3000
        );
    }).catch(() => {
        NotificationManager.error(
            'Ocurrió un error en eliminar la tarea', 
            'Error', 
            0
        );
    }).finally(() => {
       
    });
};

const borrarArchivo = () => (dispatch) => {
    dispatch({ type: ARCHIVO, archivo: null })
}

const listarTareasEntregadas = () => (dispatch) => {
    let ruta = window.location.href;
    let datos = ruta.split('/');
    let id_tarea = datos[7];
    api.get('/entregas', {id_tarea}).then((response)=>{
        dispatch({ type: LISTADO_TAREAS_ENTREGADAS, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar las tareas',
            'Error',
            0
        );
    })
}


export const actions = {
    ...baseReducer.actions,
    listar,
    registroTarea,
    leerAsignacion,
    editarTarea,
    leer,
    sumarNota,
    eliminar,
    borrarArchivo,
    listarTareasEntregadas
   
}

export const initialState = {
    ...baseReducer.initialState,
    archivo: null,
   
}

export const reducers = {
    ...baseReducer.reducers,
    [LISTADO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [ARCHIVO]: (state, { archivo }) => {
        return {
            ...state,
            archivo,
        };
    },
    [LISTADO_TAREAS_ENTREGADAS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
}


export default handleActions(reducers, initialState)