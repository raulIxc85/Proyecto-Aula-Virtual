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
import nivel from './modules/nivel/nivel';
import grado from './modules/grado/grado';
import seccion from './modules/seccion/seccion';
import ciclo from './modules/ciclo/ciclo';
import curso from './modules/curso/curso';
import asignacion from './modules/asignacionCatedratico/asignacion';
import asignacionEstudiante from './modules/asignacionEstudiante/asignacionEstudiante';
import tarea from './modules/tarea/tarea';
import material from './modules/materialClase/materialClase';
import dashboardAdmin from './modules/dashboardAdmin/dashboardAdmin';
import evento from './modules/evento/evento';
import dashboardCatedratico from './modules/dashboardCatedratico/dashboardCatedratico';
import dashboardEstudiante from './modules/dashboardEstudiante/dashboardEstudiante';
import cambiarPass from './modules/cuenta/cambiarPassword';

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
    cambioPassword,
    nivel,
    grado,
    seccion,
    ciclo,
    curso,
    asignacion,
    asignacionEstudiante,   
    tarea,
    material,
    dashboardAdmin,
    evento,
    dashboardCatedratico,
    dashboardEstudiante,
    cambiarPass
});
