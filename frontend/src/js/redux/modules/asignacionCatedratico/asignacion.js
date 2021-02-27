import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";


// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'asignacion',
    '/asignacion',
    'asignacionForm',
    '/asignaciones-catedratico'
);

export const registroAsignacion = () => (dispatch, getStore) => {
    const datos = getStore().form.asignacionForm.values;
    const data = {
        titular: datos.titular,
        catedratico: datos.catedratico.value,
        curso: datos.curso.value,
        grado: datos.grado.value,
        seccion: datos.seccion.value,

    }
    api.post('/asignacion', data).then((response) => {
        NotificationManager.success(
            'Asignacion creada',
            'Exito',
            3000
        );
        dispatch(push('/asignaciones-catedratico'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar asignacion',
            'Error',
            0
        );
    })
}

export const leerAsignacion = id => (dispatch) => {
    api.get(`/asignacion/${id}`).then((response) => {
        response.catedratico = { value: response.catedratico.id, label: response.catedratico.perfil.nombres +' '+response.catedratico.perfil.apellidos };
        response.curso = { value: response.curso.id, label: response.curso.nombre };
        response.grado = { value: response.grado.id, label: response.grado.descripcion };
        response.seccion = { value: response.seccion.id, label: response.seccion.descripcion };
        dispatch(initializeForm("asignacionForm", response));
    }).catch(() => {
    }).finally(() => {
    });
};

export const obtenerCatedraticos = (search) => () => {
  return api.get("/catedratico", {search}).then(data=>{
      if(data){
          const niveles = [];
          data.results.forEach(catedratico=>{
              niveles.push({
                  value: catedratico.id,
                  label: catedratico.perfil.nombres + ' ' + catedratico.perfil.apellidos
              })
          })
          return niveles;
      }
  }).catch(error=>{
      console.log("error: ", error);
      return [];
  })
} 

export const obtenerCursos = (search) => () => {
  return api.get("/curso", {search}).then(data=>{
      if(data){
          const niveles = [];
          data.results.forEach(curso=>{
              niveles.push({
                  value: curso.id,
                  label: curso.nombre
              })
          })
          return niveles;
      }
  }).catch(error=>{
      console.log("error: ", error);
      return [];
  })
} 

export const obtenerGrados = (search) => () => {
  return api.get("/grado", {search}).then(data=>{
      if(data){
          const niveles = [];
          data.results.forEach(grado=>{
              niveles.push({
                  value: grado.id,
                  label: grado.descripcion
              })
          })
          return niveles;
      }
  }).catch(error=>{
      console.log("error: ", error);
      return [];
  })
} 

export const obtenerSecciones = (search) => () => {
  return api.get("/seccion", {search}).then(data=>{
      if(data){
          const niveles = [];
          data.results.forEach(seccion=>{
              niveles.push({
                  value: seccion.id,
                  label: seccion.descripcion
              })
          })
          return niveles;
      }
  }).catch(error=>{
      console.log("error: ", error);
      return [];
  })
}

export const actions = {
    ...baseReducer.actions,
    registroAsignacion,
    leerAsignacion,
    obtenerCatedraticos,
    obtenerCursos,
    obtenerGrados,
    obtenerSecciones
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers,
    
}


export default handleActions(reducers, initialState)