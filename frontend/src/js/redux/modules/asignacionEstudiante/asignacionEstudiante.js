import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";

const LISTADO = 'LISTADO';
const CURSOS = 'CURSOS';
// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'asignacionEstudiante',
    '/asignacion-curso',
    'asignacionEstudianteForm',
    '/cursos-asignados'
);

export const registroAsignacionEstudiante = () => (dispatch, getStore) => {
    const datos = getStore().form.asignacionEstudianteForm.values;
    const data = {
        asignacionCatedratico: datos.id,
        estudiante: datos.estudiante.value
        
    }
    console.log("data: ", data);
    api.post('/asignacion-curso', data).then((response) => {
        NotificationManager.success(
            'Asignacion creada',
            'Exito',
            3000
        );
        dispatch(push('/cursos-asignados'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar asignacion',
            'Error',
            0
        );
    })
}

export const listarEstudiantes = () => (dispatch, getStore) => {
    api.get('/asignacion-curso').then((response)=>{
        console.log("datos redux:", response);
        
        dispatch({ type: LISTADO, lecturaEstudiantes: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los estudiantes',
            'Error',
            0
        );
    })
}

export const obtenerEstudiantes = (search) => () => {
  return api.get("/estudiante", {search}).then(data=>{
      if(data){
          const niveles = [];
          data.results.forEach(estudiante=>{
              niveles.push({
                  value: estudiante.id,
                  label: estudiante.perfil.nombres + ' ' + estudiante.perfil.apellidos
              })
          })
          return niveles;
      }
  }).catch(error=>{
      console.log("error: ", error);
      return [];
  })
} 

export const listarCursosCatedratico = () => (dispatch, getStore) => {
    api.get('/asignacion/curso').then((response)=>{
        dispatch({ type: CURSOS, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los cursos',
            'Error',
            0
        );
    })
}

export const leerAsignacion = id => (dispatch) => {
    api.get(`/asignacion/${id}`).then((response) => {
        console.log("asignacion: ", response)
        dispatch(initializeForm("asignacionEstudianteForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};

export const actions = {
    ...baseReducer.actions,
    obtenerEstudiantes,
    listarEstudiantes,
    registroAsignacionEstudiante,
    listarCursosCatedratico,
    leerAsignacion
   
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers,
    [LISTADO]: (state, { lecturaEstudiantes }) => {
        return {
            ...state,
            lecturaEstudiantes,
        };
    },
    [CURSOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
}


export default handleActions(reducers, initialState)