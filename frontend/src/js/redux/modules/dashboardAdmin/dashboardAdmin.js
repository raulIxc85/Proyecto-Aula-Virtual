import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const DATOS = 'DATOS';
const NIVELES = 'NIVELES';

export const mostrar = () => (dispatch) => {
    api.get('/dashboard/datos_admin').then((response)=>{
        dispatch({ type: DATOS, lecturaDatos: response });
        api.get('/dashboard/niveles').then((response)=>{
            console.log("niveles", response)
            dispatch({ type: NIVELES, lecturaNiveles: response });
        }).catch((error)=>{
            console.log("error: ", error)
            NotificationManager.error(
                'Ocurrió un error al mostrar ciclo',
                'Error',
                0
            );
        })
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al mostrar ciclo',
            'Error',
            0
        );
    })
}

export const actions = {
    mostrar
};

export const reducers = {
    [DATOS]: (state, { lecturaDatos } ) => {
        return {
            ...state,
            lecturaDatos
        };
    },
    [NIVELES]: (state, { lecturaNiveles } ) => {
        return {
            ...state,
            lecturaNiveles
        };
    },
};

export const initialState = {
    lecturaNiveles: null
};

export default handleActions(reducers, initialState)
