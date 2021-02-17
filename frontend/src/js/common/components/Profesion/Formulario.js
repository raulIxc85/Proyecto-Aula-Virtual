import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";

class Formulario extends Component{
    render(){
        const { handleSubmit, crear } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Profesión' : 'Registrar Profesión';
        let disabled = false;
        if (crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Profesión';
        }

        return(
            <form onSubmit={handleSubmit} className='w-50'>
                <h3>{titulo}</h3>
                <label>Profesión</label>
                <Field name='descripcion' component={renderField} disabled={disabled} />
                <br />
                <div className='d-flex flex-row justify-content-end mt-3'> 
                    <a
                        href='/#/profesiones'
                        className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>
                    
                    {disabled == false && 
                        <button
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type='submit'
                        >   
                            {editar ? 'Modificar' : 'Registrar' } 
                        </button>
                    }
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'profesion' //identificador unico del formulario
})(Formulario)

