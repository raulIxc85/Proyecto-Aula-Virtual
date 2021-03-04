import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderTextArea,
    renderFilePicker
} from "../../Utils/renderField/renderField";


class Formulario extends Component{
    render() {
        const { handleSubmit, crear, setAvatar } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Material' : 'Material de apoyo';
        let disabled = false;
        if (crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Material';
        }
        return (
            <form onSubmit={handleSubmit} className='w-75'>
                <h3>{titulo}</h3>
                <div className="mb-4 card card-small">
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                            <label htmlFor="tituloMaterial">Titulo</label>
                            <Field 
                                name="tituloMaterial" 
                                component={renderField} 
                                disabled={disabled} 
                            />
                            <label>Descripcion</label>
                            <Field 
                                name="descripcionMaterial" 
                                component={renderTextArea} 
                                disabled={disabled} 
                            />
                            <div className="form-group has-feedback flex-1 mx-3">
                                    <label htmlFor="documentoAdjunto">Subir Documento</label>
                                    <Field 
                                        type="file"
                                        name="documentoAdjunto" 
                                        component={renderFilePicker} 
                                    />
                                </div>
                            <br />
                            <div className='d-flex flex-row justify-content-end mt-3'>
                                <a
                                    href='/#/'
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
    form: 'materialForm', //identificador unico
   
})(Formulario)
