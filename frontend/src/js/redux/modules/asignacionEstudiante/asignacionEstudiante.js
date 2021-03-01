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
    api.post('/asignacion-curso', data).then((response) => {
        NotificationManager.success(
            'Estudiante asignado correctamente',
            'Exito',
            3000
        );
        dispatch(leerAsignacion(datos.id));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar la asignación',
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

export const listarCursosCatedratico = () => (dispatch) => {
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
        dispatch(initializeForm("asignacionEstudianteForm", response));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los estudiantes',
            'Error',
            0
        );
    }).finally(() => {
    });
    api.get(`/asignacion-curso/${id}`).then((response)=>{
        dispatch({ type: LISTADO, lecturaEstudiantes: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los estudiantes',
            'Error',
            0
        );
    })
};

export const eliminar = id => (dispatch, getStore) => {
    const datos = getStore().form.asignacionEstudianteForm.values;
    api.eliminar(`/asignacion-curso/${id}`).then(() => {
        dispatch(leerAsignacion(datos.id));
        NotificationManager.success(
            'Estudiante borrado', 
            'Éxito', 
            3000
        );
    }).catch(() => {
        NotificationManager.error(
            'Error en el borrado de estudiante', 
            'Error', 
            0
        );
    }).finally(() => {
        
    });
};



export const actions = {
    ...baseReducer.actions,
    obtenerEstudiantes,
    registroAsignacionEstudiante,
    listarCursosCatedratico,
    leerAsignacion,
    eliminar
   
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