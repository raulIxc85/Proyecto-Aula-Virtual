import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'material',
    '/material',
    'materialForm',
    '/cursos-asignados'
);

const registroMaterial = () => (dispatch, getStore) => {
    const datos = getStore().form.materialForm.values;
   
    const data = {
        tituloMaterial: datos.tituloMaterial,
        descripcionMaterial: datos.descripcionMaterial,
        documentoAdjunto: datos.documentoAdjunto,
        id: datos.id
        
    }
    console.log("datos: ", data);
    api.post('/material', data).then((response) => {
        NotificationManager.success(
            'Material creado correctamente',
            'Exito',
            3000
        );
        //dispatch(leerAsignacion(datos.id));
        //dispatch(push(`/cursos-asignados/${datos.id}/tareas`));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar material',
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

export const actions = {
    ...baseReducer.actions,
    registroMaterial,
    leerAsignacion
}

export const initialState = {
    ...baseReducer.initialState,
     
}

export const reducers = {
    ...baseReducer.reducers,
    
}

export default handleActions(reducers, initialState)

