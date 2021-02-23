import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";
import { validate, validators } from 'validate-redux-form';

class Formulario extends Component{
    render(){
        const { handleSubmit, crearCiclo } = this.props;
        let titulo = 'Registrar Ciclo';
        let disabled = false;
        if (crearCiclo == false){
            disabled = true;
            titulo = 'Ver Ciclo';
        }

        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label htmlFor="ciclo">Ciclo</label>
                            <Field name="ciclo" component={renderField} disabled={disabled} />
                            <br />
                            <div className='d-flex flex-row justify-content-end mt-3'> 
                                <a
                                    href='/#/ciclos'
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
        );
    }
}

export default reduxForm({
    form: 'cicloForm', //identificador unico del formulario
    validate: (data) => {
        return validate(data, {
            ciclo: validators.exists()('Este campo es requerido'),
        });
    },
})(Formulario)

