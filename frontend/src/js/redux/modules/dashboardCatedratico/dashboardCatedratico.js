import { handleActions } from 'redux-actions';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LISTADO_CURSOS = 'LISTADO_CURSOS';
const EVENTOS = 'EVENTOS';
const LISTADO_TAREAS = 'LISTADO_TAREAS';
const CANTIDAD = 'CANTIDAD'

export const mostrar = () => (dispatch) => {
    api.get('/dashboard_catedratico/curso').then((response)=>{
        dispatch({ type: LISTADO_CURSOS, lecturaCursos: response });
        api.get('/dashboard_catedratico/eventos').then((response)=>{
            dispatch({ type: EVENTOS, lecturaEventos: response });
            api.get('/dashboard_catedratico/tareas_pendientes').then((response)=>{
                dispatch({ type: LISTADO_TAREAS, lecturaTareas: response });
                api.get('/dashboard_catedratico/cantidad_tareas').then((response)=>{
                    console.log("tareas", response)
                    dispatch({ type: CANTIDAD, lecturaCantidad: response });
                }).catch((error)=>{
                    console.log("error: ", error)
                    NotificationManager.error(
                        'Ocurrió un error al listar cursos',
                        'Error',
                        0
                    );
                })
            }).catch((error)=>{
                console.log("error: ", error)
                NotificationManager.error(
                    'Ocurrió un error al listar cursos',
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
    [CANTIDAD]: (state, { lecturaCantidad }) => {
        return {
            ...state,
            lecturaCantidad
        }
    },
};

export const initialState = {
    lecturaCursos: '',
    lecturaEventos: '',
    lecturaTareas: '',
    lecturaCantidad: ''
};

export default handleActions(reducers, initialState)
