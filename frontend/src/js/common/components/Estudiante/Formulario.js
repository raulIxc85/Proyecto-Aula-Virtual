import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderNumber,
    SelectField,
} from "../Utils/renderField/renderField";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';

const genders = [
    {"label": "Masculino", "value": 0},
    {"label": "Femenino", "value": 1},
];

const rol = [
    {"label": "Estudiante", "value": 3},
];

class Formulario extends Component{
    render(){
        const { handleSubmit, crear } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Modificar Estudiante' : 'Registrar Estudiante';
        let disabled = false;
        let carnetBloq = false;
        let correo = true;
        let hidden = '';
        let contra = 'Contraseña'
        let confContra = 'Confirmar Contraseña'
        if (crear == false && editar == false){
            disabled = true;
            carnetBloq = true;
            titulo = 'Ver Estudiante';
            hidden='hidden'
            contra = '';
            confContra = '';
        }else{
            if (editar==true){
                hidden = 'hidden';
                contra = '';
                confContra = '';
            }
            if (crear==true){
                correo = false;
                hidden='password';
            }
        }

        return(
            <form onSubmit={handleSubmit} >
                <h3>{titulo}</h3>
                <div className='w-25'>
                    <label>Carnet</label>
                    <Field name='carnet' component={renderField} disabled={carnetBloq} />
                </div>
                <label>Nombres</label>
                <Field name='perfil.nombres' component={renderField} disabled={disabled}  />
                <label>Apellidos</label>
                <Field name='perfil.apellidos' component={renderField} disabled={disabled} />
                <label>Direccion</label>
                <Field name='perfil.direccion' component={renderField} disabled={disabled} />
                <div className='w-25'>
                    <label>Telefono</label>
                    <Field
                        numberFormat={"+(502) ####-####"}
                        name='perfil.telefono' 
                        component={renderNumber} 
                        disabled={disabled} 
                    />
                </div>
                <label>Nombre Contacto</label>
                <Field name='nombreContacto' component={renderField} disabled={disabled}  />
                <label>Direccion de Contacto</label>
                <Field name='direccionContacto' component={renderField} disabled={disabled} />
                <div className='row'>
                    <div className='col-md-6'>
                        <label>Telefono de Contacto</label>
                        <Field 
                            numberFormat={"+(502) ####-####"}
                            name='telefonoContacto' 
                            component={renderNumber} 
                            disabled={disabled}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label>Correo Electronico</label>
                        <Field 
                            name='perfil.user.username' 
                            component={renderField} 
                            disabled={correo} 
                        />
                    </div>
                    
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label>{contra}</label>
                        <Field 
                            name='password' 
                            component={renderField} 
                            disabled={disabled}
                            type={hidden}    
                        />
                    </div>
                    <div className='col-md-6'>
                        <label>{confContra}</label>
                        <Field 
                            name='confirmacion' 
                            component={renderField} 
                            disabled={disabled} 
                            type={hidden} 
                        />
                    </div>   
                    <div className='col-md-6'>
                        <label>Género</label>
                        <Field 
                            name="perfil.gender"
                            placeholder="Seleccionar..." 
                            options={genders} 
                            component={SelectField} 
                            className="form-control" 
                            disabled={disabled}
                        />
                    </div>
                    <div className='col-md-6'>
                        <label>Rol</label>
                        <Field 
                            name="perfil.rol" 
                            component={SelectField} 
                            options={rol} 
                            className="form-control" 
                            disabled={disabled}
                        />
                    </div> 
                </div>
                
                <br />
                <div className='d-flex flex-row justify-content-end mt-3'> 
                    <a
                        href='/#/estudiantes'
                        className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>
                    
                    { disabled == false &&
                        <button
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type='submit'
                        >   
                            Registrar 
                        </button>
                    }
                </div>
            </form>
        );
    }
}

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'estudiante', //identificador unico del formulario
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            username: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(Formulario)
