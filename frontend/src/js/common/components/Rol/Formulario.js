import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";

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
                <label>Rol</label>
                <Field name='descripcion' component={renderField} disabled={disabled} />
                <br />
                <div className='d-flex flex-row justify-content-end mt-3'> 
                    <a
                        href='/#/roles'
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
    form: 'rol' //identificador unico del formulario
})(Formulario)

