import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
import { push } from "react-router-redux";
import { api } from "api";

import moment from 'moment';

const LISTADO = 'LISTADO';
const CURSOS = 'CURSOS';
const CURSOADMIN = 'CURSOADMIN';
const ARCHIVO_PORTADA = 'ARCHIVO_PORTADA';
const CURSOS_ESTUDIANTE = 'CURSOS_ESTUDIANTE';
const MATERIAL_CURSO = 'MATERIAL_CURSO';
const TAREA_CURSO = 'TAREA_CURSO';
const ARCHIVO = 'ARCHIVO';
const ARCHIVO_TAREA = 'ARCHIVO_TAREA';
const TAREAS_NOTAS = 'TAREAS_NOTAS';

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'asignacionEstudiante',
    '/asignacion-curso',
    'asignacionEstudianteForm',
    '/cursos-asignados'
);

const registroAsignacionEstudiante = () => (dispatch, getStore) => {
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

const obtenerEstudiantes = (search) => () => {
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

const listarCursosCatedratico = () => (dispatch) => {
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

const leerAsignacion = id => (dispatch) => {
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

const leerAsignacionAdmin = id => (dispatch) => {
    api.get(`/asignacion/${id}`).then((response) => {
        dispatch({ type: CURSOADMIN, lecturaCurso: response });
        dispatch({ type: ARCHIVO_PORTADA, imagenPortada: response });
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar asignaciones',
            'Error',
            0
        );
    }).finally(() => {
    });
};

const eliminar = id => (dispatch, getStore) => {
    const datos = getStore().form.asignacionEstudianteForm.values;
    api.eliminar(`/asignacion-curso/${id}`).then(() => {
        dispatch(leerAsignacion(datos.id));
        NotificationManager.success(
            'Estudiante borrado', 
            'Éxito', 
            3000
        );
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Error en el borrado de estudiante', 
            'Error', 
            0
        );
    }).finally(() => {
        
    });
};


const actualizarPortada = ( data={} , attachments) => (dispatch) => {
    let ruta = window.location.href;
    let url = ruta.split('/');
    let id_asignacion = url[5];
    dispatch(push('/cursos-asignados'));
    api.putAttachments(`/asignacion/${id_asignacion}`, data, attachments).then((response) => {
        NotificationManager.success(
            'Portada actualizada', 
            'Éxito', 
            3000
        );
        
    }).catch(() => {
        console.log("error: ", error)
        NotificationManager.error(
            'Error en la modificación de portada', 
            'Error', 
            0
        );
    }).finally(() => {
    });
};

const borrarArchivo = () => (dispatch) => {
    dispatch({ type: ARCHIVO_PORTADA, imagenPortada: null })
}

const listarCursosEstudiante = () => (dispatch) => {
    api.get('/asignacion-curso/curso').then((response)=>{
        dispatch({ type: CURSOS_ESTUDIANTE, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los cursos',
            'Error',
            0
        );
    })
}

const leerAsignacionPortada = id => (dispatch) => {
    let id_asignacion;
    api.get('/asignacion-curso/curso_detalle',{id}).then((response) => {
        response.results.forEach(datos=>{
            id_asignacion = datos.asignacionCatedratico[0].id;
        });
        dispatch({ type: CURSOADMIN, lecturaCurso: response });
        //Si hay material del curso
        api.get('/material/material_curso',{id_asignacion}).then((response) => {
            dispatch({ type: MATERIAL_CURSO, lecturaMaterial: response });
            //si hay tareas
            api.get('/tarea/tarea_curso',{id_asignacion}).then((response) => {
                dispatch({ type: TAREA_CURSO, lecturaTarea: response });
                //mostrar notas de tareas enviadas
                api.get('/entregas/notas').then((response)=>{
                    dispatch({ type: TAREAS_NOTAS, lecturaNotas: response });
                }).catch((error)=>{
                    console.log("error: ", error)
                    NotificationManager.error(
                        'Ocurrió un error al listar las notas',
                        'Error',
                        0
                    );
                })
            }).catch((error) => {
                console.log("error: ", error)
                NotificationManager.error(
                    'Ocurrió un error al listar tareas',
                    'Error',
                    0
                );
            }).finally(() => {
            });
        }).catch((error) => {
            console.log("error: ", error)
            NotificationManager.error(
                'Ocurrió un error al listar material',
                'Error',
                0
            );
        }).finally(() => {
        });
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar asignaciones',
            'Error',
            0
        );
    }).finally(() => {
    });
    
};

const leerTarea = id => (dispatch) => {
    api.get(`tarea/${id}`).then((response) => {
        let datos = response.fechaHoraEntrega.split('T');
        response.fecha = moment(datos[0]).format("DD-MM-YYYY");
        let formatoHora = datos[1].split(':');
        response.hora = formatoHora[0]+":"+formatoHora[1];
        dispatch(initializeForm("tareaEntregaForm", response));
        dispatch({ type: ARCHIVO, archivo: response });
        api.get(`entregas/${id}`).then((response) => {
            response.results.forEach(datos=>{
                response.archivo = datos.estudiante.archivo;
                response.texto = datos.estudiante.texto;
                response.id = datos.estudiante.id;
            })
            dispatch(initializeForm("tareaEntregaForm", response));
            dispatch({ type: ARCHIVO_TAREA, archivo_tarea: response });
        }).catch((error) => {
            console.log("error: ", error)
            NotificationManager.error(
                'Ocurrió un error al consultar la tarea',
                'Error',
                0
            );
        })
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar la tarea',
            'Error',
            0
        );
    }).finally(() => {
    });
};

const registroEntregaTarea = (datos={}, attachments=[]) => (dispatch) => {
    let ruta = window.location.href;
    let url = ruta.split('/');
    let id_asignacion = url[5];
    let id_tarea = url[7];
    const data = {
        texto: datos.texto,
        id: id_tarea,
        fechaHora: new Date()
    }
    api.postAttachments('/entrega_tarea', data, attachments).then((response) => {
        NotificationManager.success(
            'Entrega de tarea creada correctamente',
            'Exito',
            3000
        );
        dispatch(push(`/cursos-asignados-estudiante/${id_asignacion}/ver-curso-estudiante`));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar la entrega de tarea',
            'Error',
            0
        );
    })
}


const modificarEntregaTarea = (datos={}, attachments) => (dispatch) => {
    let ruta = window.location.href;
    let url = ruta.split('/');
    let id_asignacion = url[5];
    let id_entrega = datos.id;
    const data = {
        texto: datos.texto,
        fechaHora: new Date()
    }
    api.putAttachments(`/entrega_tarea/${id_entrega}`, data, attachments).then((response) => {
        NotificationManager.success(
            'Tarea modificada correctamente',
            'Exito',
            3000
        );
        dispatch(push(`/cursos-asignados-estudiante/${id_asignacion}/ver-curso-estudiante`));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar la Tarea',
            'Error',
            0
        );
    })
}



const borrarArchivoTarea = () => (dispatch) => {
    dispatch({ type: ARCHIVO_TAREA, archivo_tarea: null })
}

const borrarArchivoPortada = () => (dispatch) => {
    dispatch({ type: ARCHIVO_PORTADA, imagenPortada: null })
}

export const actions = {
    ...baseReducer.actions,
    obtenerEstudiantes,
    registroAsignacionEstudiante,
    listarCursosCatedratico,
    leerAsignacion,
    eliminar,
    leerAsignacionAdmin,
    actualizarPortada,
    borrarArchivo,
    listarCursosEstudiante,
    leerAsignacionPortada,
    leerTarea,
    registroEntregaTarea,
    borrarArchivoTarea,
    modificarEntregaTarea,
    borrarArchivoPortada
}

export const initialState = {
    ...baseReducer.initialState,
    lecturaCurso: null, 
    imagenPortada: null,
    lecturaMaterial: null,
    lecturaTarea: null,
    archivo: null,
    archivo_tarea: null,
    lecturaNotas: null
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
    [CURSOADMIN]: (state, { lecturaCurso }) => {
        return {
            ...state,
            lecturaCurso,
        };
    },
    [ARCHIVO_PORTADA]: (state, { imagenPortada }) => {
        return {
            ...state,
            imagenPortada,
        };
    },
    [CURSOS_ESTUDIANTE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [MATERIAL_CURSO]: (state, { lecturaMaterial }) => {
        return {
            ...state,
            lecturaMaterial,
        };
    },
    [TAREA_CURSO]: (state, { lecturaTarea }) => {
        return {
            ...state,
            lecturaTarea,
        };
    },
    [ARCHIVO]: (state, { archivo }) => {
        return {
            ...state,
            archivo,
        };
    },
    [ARCHIVO_TAREA]: (state, { archivo_tarea }) => {
        return {
            ...state,
            archivo_tarea,
        };
    },
    [TAREAS_NOTAS]: (state, { lecturaNotas }) => {
        return {
            ...state,
            lecturaNotas,
        };
    },
}


export default handleActions(reducers, initialState)