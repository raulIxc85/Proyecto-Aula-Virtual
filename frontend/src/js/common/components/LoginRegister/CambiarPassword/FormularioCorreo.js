import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import { validate, validators } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';


const FormularioCorreo = (props) => {
   const { handleSubmit } = props;
        
    return (
        <form className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="correo">Correo Electrónico</label>
                    <Field
                        name="correo"
                        component={renderField}
                        type="email"
                        className="form-control"
                    />
            </div>
            <div className="buttons-box">
                <button  
                    type="submit" 
                    className="btn btn-primary m-1 align-self-center"
                >
                    Enviar correo
                </button>
                
                <Link to="/login" 
                        
                    className="btn btn-secondary btn-sm mr-2 align-self-center"
                >
                    Cancelar
                </Link>
                
            </div>
        </form>
       
    );
};


export default reduxForm({
    form: 'recuperarPassForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            correo: validators.exists()('Este campo es requerido'),
        });
    },
})(FormularioCorreo);
