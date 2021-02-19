import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';

import rol from './modules/rol/rol';
import estudiante from './modules/estudiante/estudiante';
import profesion from './modules/profesion/profesion';
import catedratico from './modules/catedratico/catedratico';
import cambioPassword from './modules/cuenta/cambioPassword';

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    rol,
    estudiante,
    profesion,
    catedratico,
    cambioPassword
});
