import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderTextArea
} from "../Utils/renderField/renderField";
import { validate, validators } from 'validate-redux-form';

class Formulario extends Component{
    render() {
        const { handleSubmit, crearCurso } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Curso' : 'Registrar Curso';
        let disabled = false;
        if (crearCurso == false && editar == false){
            disabled = true;
            titulo = 'Ver Curso';
        }
        return (
            <form onSubmit={handleSubmit} className='w-50'>
                <h3>{titulo}</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label htmlFor="nombre">Nombre</label>
                            <Field name="nombre" component={renderField} disabled={disabled} />
                            <label htmlFor="descripcion">Descripcion</label>
                            <Field name='descripcion' component={renderTextArea} disabled={disabled} />                            
                            <br />
                            <div className='d-flex flex-row justify-content-end mt-3'>
                                <a
                                    href='/#/cursos'
                                    className='btn btn-secondary btn-sm mr-2 mb-3'
                                >
                                    Cancelar
                                </a>
                                {disabled == false && 
                                    <button
                                        className={`btn btn-sm mb-3 ${editar ? 'btn-success' : 'btn-primary'}`}
                                        type='submit'
                                    >   
                                        { editar ? 'Modificar' : 'Registrar' }
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
    form: 'cursoForm', //identificador unico
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            descripcion: validators.exists()('Este campo es requerido'),
        });
    },
})(Formulario)
