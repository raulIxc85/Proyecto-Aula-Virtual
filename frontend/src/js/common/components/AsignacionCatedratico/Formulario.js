import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderFieldCheck,
    AsyncSelectField,
} from "../Utils/renderField/renderField";


class Formulario extends Component{
    
    render() {
        const { handleSubmit, 
                crear, 
                obtenerCatedraticos,
                obtenerCursos,
                obtenerGrados,
                obtenerSecciones 
        } = this.props;
        let titulo = 'Registrar Asignación';
        let disabled = false;
        if (crear == false ){
            disabled = true;
            titulo = 'Ver Asignación';
        }
        return (
            <form onSubmit={handleSubmit} className='w-50'>
                <h3>{titulo}</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label>Catedratico</label>
                            <Field 
                                name="catedratico"
                                placeholder="Seleccionar..." 
                                component={AsyncSelectField} 
                                loadOptions={obtenerCatedraticos} 
                                className="form-control" 
                                disabled={disabled}
                            />    
                            <label>Curso</label>
                            <Field 
                                name="curso"
                                placeholder="Seleccionar..." 
                                component={AsyncSelectField} 
                                loadOptions={obtenerCursos} 
                                className="form-control" 
                                disabled={disabled}
                            />    
                            <label>Grado</label>
                            <Field 
                                name="grado"
                                placeholder="Seleccionar..." 
                                component={AsyncSelectField} 
                                loadOptions={obtenerGrados} 
                                className="form-control" 
                                disabled={disabled}
                            />    
                            <label>Sección</label>
                            <Field 
                                name="seccion"
                                placeholder="Seleccionar..." 
                                component={AsyncSelectField} 
                                loadOptions={obtenerSecciones} 
                                className="form-control" 
                                disabled={disabled}
                            />
                            <br />
                            <Field
                                type="checkbox"
                                disabled={disabled}
                                name="titular"
                                label="Titular"
                                component={renderFieldCheck}
                            />
                                
                            <br />
                            <div className='d-flex flex-row justify-content-end mt-3'>
                                <a
                                    href='/#/asignaciones-catedratico'
                                    className='btn btn-secondary btn-sm mr-2 mb-3'
                                >
                                    Cancelar
                                </a>
                                {disabled == false && 
                                    <button
                                        className={'btn btn-sm mb-3 btn-primary'}
                                        type='submit'
                                    >   
                                        Registrar
                                    </button>  
                                }
                            </div>  
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'asignacionForm', //identificador unico
   
})(Formulario)
