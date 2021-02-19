import React, { Component } from 'react';
import Formulario from './Formulario';

class CambioPassword extends Component {
   
    render() {
        const { cambiarPass, me, borrarToken } = this.props;
        const borrar = borrarToken;
        const datos = me; 
        return (
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h4>Cambio de Contraseña</h4>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">Usuario: {datos.username}</h5>
                        <Formulario
                            borrar = {borrar}
                            onSubmit = {cambiarPass}
                        />
                    </div>
                </div>
               
            </div>
        );
    }
}

export default CambioPassword;
