import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";
import { validate, validators } from 'validate-redux-form';

class Formulario extends Component{
    render(){
        const { handleSubmit, crear } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Rol' : 'Registrar Rol';
        let disabled = false;
        if (crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Rol';
        }

        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label>Rol</label>
                            <Field name='descripcion' component={renderField} disabled={disabled} />
                            <br />
                            <div className='d-flex flex-row justify-content-end mt-3'> 
                                <a
                                    href='/#/roles'
                                    className='btn btn-secondary btn-sm mr-2 mb-3'
                                >
                                    Cancelar
                                </a>
                                
                                {disabled == false && 
                                    <button
                                        className={`btn btn-sm mb-3 ${editar ? 'btn-success' : 'btn-primary'}`}
                                        type='submit'
                                    >   
                                        {editar ? 'Modificar' : 'Registrar' } 
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'rol', //identificador unico del formulario
    validate: (data) => {
        return validate(data, {
            descripcion: validators.exists()('Este campo es requerido'),
        });
    },
})(Formulario)

