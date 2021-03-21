import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ConfirmacionEnvio extends Component{
    render() {
        return(
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <div className="error-template">
                        <h3>Cambiar Contraseña</h3>
                        <p className="text-justify">Se ha enviado un correo electrónico para realizar el cambio de contraseña,
                        verifique su correo electrónico y siga las instrucciones proporcionadas.
                        </p>
                        <Link to="/login" 
                            
                            className="btn btn-dark btn-sm mr-2 align-self-center"
                        >
                            Continuar
                        </Link>
                    </div>
                </div>
               
            </div>
        )
    } 
    
}

export default ConfirmacionEnvio;