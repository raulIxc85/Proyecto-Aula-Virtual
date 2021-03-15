import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderNumber,
} from "../../Utils/renderField/renderField";
import { validate, validators } from 'validate-redux-form';

class Formulario extends Component{
    render(){
        const { handleSubmit } = this.props;
        let titulo = 'Calificar Tarea';
        let ruta = window.location.href;
        let datos = ruta.split('/');
        let regresar = datos[0]+'/'+datos[1]+'/'+datos[2]+'/'+datos[3]+'/'+datos[4]+'/'+datos[5]+'/'+datos[6]+'/'+datos[7]+'/';
        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label htmlFor="notaTarea">Nota</label>
                            <Field 
                                name="notaTarea" 
                                decimalScale={1}
                                component={renderNumber} 
                            />
                            <br />
                            <div className='d-flex flex-row justify-content-end mt-3'> 
                                <a
                                    href={regresar}
                                    className='btn btn-secondary btn-sm mr-2 mb-3'
                                >
                                    Cancelar
                                </a>
                                
                                <button
                                    className={'btn btn-sm mb-3 btn-primary'}
                                    type='submit'
                                >   
                                    Calificar
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'calificarForm', //identificador unico del formulario
    validate: (data) => {
        return validate(data, {
            notaTarea: validators.exists()('Este campo es requerido'),
        });
    },
})(Formulario)

