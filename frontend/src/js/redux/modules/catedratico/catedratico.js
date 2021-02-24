import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_CATEDRATICOS = 'GUARDAR_LISTADO_CATEDRATICOS';
const GUARDAR_REGISTRO_CATEDRATICOS = 'GUARDAR_REGISTRO_CATEDRATICOS';

export const listar = () => (dispatch, getStore) => {
    api.get('/catedratico').then((response)=>{
        dispatch({ type: GUARDAR_LISTADO_CATEDRATICOS, data: response });
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al listar los catedráticos',
            'Error',
            0
        );
    })
}

export const leer = (id) => (dispatch) => {
    api.get(`/catedratico/${id}`).then((response) => {
        response.profesion = { value: response.profesion.id, label: response.profesion.descripcion };
        dispatch({type: GUARDAR_REGISTRO_CATEDRATICOS, lectura: response });
        dispatch(initializeForm('catedraticoForm', response ));
    }).catch((error)=>{
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al consultar el catedrático',
            'Error',
            0
        );
    })
}

export const registroCatedratico = () => (dispatch, getStore) => {
    const data = getStore().form.catedraticoForm.values;
    const formData = {
        username: data.perfil.user.username,
        password: data.password,
        profile: {
            nombres: data.perfil.nombres,
            apellidos: data.perfil.apellidos,
            direccion: data.perfil.direccion,
            telefono: data.perfil.telefono,
            gender: data.perfil.gender,
            rol: data.perfil.rol,
            catedratico: {
                profesion: data.profesion.value
            }
        }
    }
    api.post('/catedratico', formData).then((response) => {
        NotificationManager.success(
            'Catedrático creado',
            'Exito',
            3000
        );
        dispatch(push('/catedraticos'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al registrar el catedrático',
            'Error',
            0
        );
    })
}

export const modificarCatedratico = () => (dispatch, getStore) => {
    const datos = getStore().form.catedraticoForm.values;
    const id = datos.id;
    const formData = {
        id: datos.perfil.user.id,
        idCa: datos.id,
        profile: {
            nombres: datos.perfil.nombres,
            apellidos: datos.perfil.apellidos,
            direccion: datos.perfil.direccion,
            telefono: datos.perfil.telefono,
            gender: datos.perfil.gender,
            rol: datos.perfil.rol,
            catedratico: {
                profesion: datos.profesion.value
            }
        }
    }
    
    api.put(`/catedratico/${id}`, formData).then((response) => {
        NotificationManager.success(
            'Catedrático modificado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/catedraticos'));
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al modificar el catedrático',
            'Error',
            0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/catedratico/${id}`).then((response) => {
        NotificationManager.success(
            'Catedrático borrado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error)
        NotificationManager.error(
            'Ocurrió un error al borrar el catedrático',
            'Error',
            0
        );
    })
}

export const listarProfesiones = (search) => () => {
    return api.get("/profesion", {search}).then(data=>{
        if(data){
            const niveles = [];
            data.results.forEach(nivel=>{
                niveles.push({
                    value: nivel.id,
                    label: nivel.descripcion
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
    registroCatedratico,
    modificarCatedratico,
    listar,
    leer,
    eliminar,
    listarProfesiones
};

export const reducers = {
    [GUARDAR_LISTADO_CATEDRATICOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_CATEDRATICOS]: (state, { lectura }) => {
        return {
            ...state,
            lectura,
        };
    }
    
};

export const initialState = {
    loader: false,
    data: null,
    lectura: null,
};

export default handleActions(reducers, initialState)