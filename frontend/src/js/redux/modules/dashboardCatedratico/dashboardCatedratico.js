import { handleActions } from 'redux-actions';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LISTADO_CURSOS = 'LISTADO_CURSOS';
const EVENTOS = 'EVENTOS';

export const mostrar = () => (dispatch) => {
    api.get('/dashboard_catedratico/curso').then((response)=>{
        dispatch({ type: LISTADO_CURSOS, lecturaCursos: response });
        api.get('/dashboard_catedratico/eventos').then((response)=>{
            console.log("eventos", response)
            dispatch({ type: EVENTOS, lecturaEventos: response });
        }).catch((error)=>{
            console.log("error: ", error)
            NotificationManager.error(
                'Ocurrió un error al listar eventos',
                'Error',
                0
            );
        })
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los cursos',
            'Error',
            0
        );
    })
}

export const actions = {
    mostrar
};

export const reducers = {
    [LISTADO_CURSOS]: (state, { lecturaCursos } ) => {
        return {
            ...state,
            lecturaCursos
        };
    },
    [EVENTOS]: (state, { lecturaEventos } ) => {
        return {
            ...state,
            lecturaEventos
        };
    },
};

export const initialState = {
    lecturaCursos: '',
    lecturaEventos: ''
};

export default handleActions(reducers, initialState)
