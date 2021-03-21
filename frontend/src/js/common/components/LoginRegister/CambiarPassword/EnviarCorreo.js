import React, { Component } from 'react';
import FormularioCorreo from './FormularioCorreo';

class EnviarCorreo extends Component {
   
    render() {
        const { revisarCorreo } = this.props;
       
        return (
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h4>Cambiar Contraseña</h4>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <FormularioCorreo
                            onSubmit = {revisarCorreo}
                        />
                    </div>
                </div>
               
            </div>
        );
    }
}

export default EnviarCorreo;
