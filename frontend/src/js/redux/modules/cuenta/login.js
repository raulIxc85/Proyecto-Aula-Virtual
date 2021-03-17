import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'LOGIN_SUBMIT';
const LOADER = 'LOGIN_LOADER';
const ME = 'LOGIN_ME';

export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setMe = me => ({
    type: ME,
    me,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.post('user/token', data).then((response) => {
        localStorage.setItem('token', response.token);
    
        if (response.user.last_login === null){
            dispatch(initializeForm('cambioPassForm', response.user));
            dispatch(setMe(response.user))
            dispatch(push("/cambio-password"));
        }else{
            console.log("login:", response);
            if (response.user.is_superuser === true){
                dispatch(initializeForm('profile', response.user));
                dispatch(setMe(response.user));
                dispatch(push("/"));
            }else if (response.user.profile.rol === 1){
                dispatch(initializeForm('profile', response.user));
                dispatch(setMe(response.user));
                dispatch(push("/home"));
            }else if (response.user.profile.rol === 2){
                dispatch(initializeForm('profile', response.user));
                dispatch(setMe(response.user));
                dispatch(push("/home-estudiante"));
            }
        }
        
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const getMe = () => (dispatch) => {
    api.get('/user/me').then(me => {
        dispatch(initializeForm('profile', me));
        dispatch(setMe(me));
    })
        .catch(() => {
    }).finally(() => {});
};

export const logOut = () => (dispatch) => {
    api.post('/user/logout').then(() => {
    }).catch(() => {
    }).finally(() => {});
    localStorage.removeItem('token');
};


export const actions = {
    onSubmit,
    logOut,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [ME]: (state, { me }) => {
        return {
            ...state,
            me,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
};

export default handleActions(reducers, initialState);
