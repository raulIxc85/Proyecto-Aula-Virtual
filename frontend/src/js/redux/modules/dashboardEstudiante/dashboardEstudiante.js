import { handleActions } from 'redux-actions';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LISTADO_CURSOS = 'LISTADO_CURSOS';
const EVENTOS = 'EVENTOS';
const LISTADO_TAREAS = 'LISTADO_TAREAS'

export const mostrar = () => (dispatch) => {
    api.get('/dashboard_estudiante/curso').then((response)=>{
        dispatch({ type: LISTADO_CURSOS, lecturaCursos: response });
        api.get('/dashboard_estudiante/eventos').then((response)=>{
            dispatch({ type: EVENTOS, lecturaEventos: response });
            api.get('/dashboard_estudiante/tareas').then((response)=>{
                dispatch({ type: LISTADO_TAREAS, lecturaTareas: response });
            }).catch((error)=>{
                console.log("error: ", error)
                NotificationManager.error(
                    'Ocurrió un error al listar tareas',
                    'Error',
                    0
                );
            })
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
    [LISTADO_TAREAS]: (state, { lecturaTareas }) => {
        return {
            ...state,
            lecturaTareas
        }
    },
};

export const initialState = {
    lecturaCursos: '',
    lecturaEventos: '',
    lecturaTareas: '',
};

export default handleActions(reducers, initialState)
