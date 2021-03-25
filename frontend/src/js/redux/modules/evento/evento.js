import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { api } from "api";

const LISTADO_EVENTOS = 'LISTADO_EVENTOS';
const PAGE = 'PAGE';

const setPage = page => ({
    type: PAGE,
    page,
});

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'evento',
    '/evento',
    'eventoForm',
    '/eventos'
);

const crearEvento = () => (dispatch, getStore) => {
    const formData = getStore().form.eventoForm.values;
    let datos = new Date()
    var mes = datos.getMonth() + 1;
    let fecha = datos.getFullYear()+'-'+mes+'-'+datos.getDate();
    let hora = datos.getHours()+':'+datos.getMinutes()+':'+datos.getSeconds();
    const data = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha: fecha,
        hora: hora
    }
    api.post('/evento', data).then((response) => {
        NotificationManager.success(
            'Evento creado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/eventos'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al crear evento',
            'Error',
            0
        );
    })
}

export const modificarEvento = () => (dispatch, getStore) => {
    const formData = getStore().form.eventoForm.values;
    const id = formData.id;
    api.put(`/evento/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Evento modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/eventos'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar evento',
            'Error',
            0
        );
    })
}

export const listar = (page=1) => (dispatch) => {
    const params = { page };
    api.get('/evento',params).then((response)=>{
        dispatch({ type: LISTADO_EVENTOS, data: response });
        dispatch(setPage(page));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los roles',
            'Error',
            0
        );
    })
}

export const actions = {
    ...baseReducer.actions,
    crearEvento,
    modificarEvento,
    listar
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers,
    [LISTADO_EVENTOS]: (state , { data }) => {
        return {
            ...state,
            data
        };
    },
}


export default handleActions(reducers, initialState)