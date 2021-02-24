import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { api } from "api";

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'curso',
    '/curso',
    'cursoForm',
    '/cursos'
);

export const modificarCurso = () => (dispatch, getStore) => {
    const formData = getStore().form.cursoForm.values;
    const id = formData.id;
    api.put(`/curso/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Curso modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/cursos'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar curso',
            'Error',
            0
        );
    })
}

export const actions = {
    ...baseReducer.actions,
    modificarCurso
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers
}


export default handleActions(reducers, initialState)