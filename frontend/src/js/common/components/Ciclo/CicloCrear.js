import React, { Component } from 'react';
import Formulario from './Formulario';

class Ciclo extends Component{
    state={
        crearCiclo: true,
    }
    componentWillMount = () => {
        const { leer, match } = this.props;
        const id = match.params.id;
        if (id){
            this.setState({crearCiclo: false});
            leer(id);
        }
        
    }
    render(){
        const { crear } = this.props;
        const { crearCiclo } = this.state;
        
        return(
            <Formulario
                crearCiclo = {crearCiclo} 
                onSubmit={crear}
            />
        );
    }
}

export default Ciclo;