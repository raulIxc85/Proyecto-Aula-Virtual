import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const LISTADO_MATERIAL = 'LISTADO_MATERIAL';
const ARCHIVO_MATERIAL = 'ARCHIVO_MATERIAL';

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'material',
    '/material',
    'materialForm',
    '/cursos-asignados'
);

const registroMaterial = (datos={}, attachments=[]) => (dispatch) => {
    let ruta = window.location.href;
    let url = ruta.split('/');
    let id_asignacion = url[5];
    const data = {
        tituloMaterial: datos.tituloMaterial,
        descripcionMaterial: datos.descripcionMaterial,
        id: id_asignacion
        
    }
    api.postAttachments('/material', data, attachments).then((response) => {
        NotificationManager.success(
            'Material creado correctamente',
            'Exito',
            3000
        );
        dispatch(leerAsignacion(id_asignacion));
        dispatch(push(`/cursos-asignados/${id_asignacion}/material`));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar material',
            'Error',
            0
        );
    })
}

const editarMaterial = (datos={}, attachments) => (dispatch) => {
    let ruta = window.location.href;
    let url = ruta.split('/');
    let id_asignacion = url[5];
    const data = {
        tituloMaterial: datos.tituloMaterial,
        descripcionMaterial: datos.descripcionMaterial,
        id: datos.id
        
    }
    api.putAttachments(`/material/${datos.id}`, data, attachments).then((response) => {
        NotificationManager.success(
            'Material modificado correctamente',
            'Exito',
            3000
        );
        dispatch(leerAsignacion(id_asignacion));
        dispatch(push(`/cursos-asignados/${id_asignacion}/material`));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar material',
            'Error',
            0
        );
    })
}

const leer = id => (dispatch) => {
   
    api.get(`material/${id}`).then((response) => {
        dispatch(initializeForm("materialForm", response));
        dispatch({ type: ARCHIVO_MATERIAL, archivo: response });
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar material',
            'Error',
            0
        );
    }).finally(() => {
    });
};

/* Listar materiales */
const listar = id => (dispatch) => {
    api.get('/material', {id}).then((response)=>{
        dispatch({ type: LISTADO_MATERIAL, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar materiales',
            'Error',
            0
        );
    })
}

const leerAsignacion = id => (dispatch) => {
    api.get(`asignacion/${id}`).then((response) => {
        dispatch(initializeForm('materialForm', response ));
    }).catch(() => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar la asignacion',
            'Error',
            0
        );
    });
};

const eliminar = id => (dispatch) => {
    let ruta = window.location.href;
    let datos = ruta.split('/');
    let id_asignacion = datos[5];
    api.eliminar(`material/${id}`).then(() => {
        dispatch(listar(id_asignacion));
        NotificationManager.success(
            'Material eliminado', 
            'Éxito', 
            3000
        );
    }).catch(() => {
        NotificationManager.error(
            'Ocurrió un error en eliminar material', 
            'Error', 
            0
        );
    }).finally(() => {
       
    });
};

const borrarArchivo = () => (dispatch) => {
    dispatch({ type: ARCHIVO_MATERIAL, archivo: null })
}

export const actions = {
    ...baseReducer.actions,
    registroMaterial,
    editarMaterial,
    leerAsignacion,
    leer,
    listar,
    eliminar,
    borrarArchivo
}

export const initialState = {
    ...baseReducer.initialState,
    archivo: null,
}

export const reducers = {
    ...baseReducer.reducers,
    [LISTADO_MATERIAL]: (state, { data }) => {
      return {
          ...state,
          data,
      }  
    },
    [ARCHIVO_MATERIAL]: (state, { archivo }) => {
        return {
            ...state,
            archivo,
        };
    },
    
}

export default handleActions(reducers, initialState)

