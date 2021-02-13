import React, { Component } from 'react';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoEstudiante extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){
        console.log("PROPS en listado estudiante: ", this.props);
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Estudiantes Registrados</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/estudiantes/crear'
                        className='btn btn-primary'
                    >
                        Crear Estudiante
                    </a>
                </div>
                <Grid hover striped 
                    data={data} 
                    loading={loader} 
                    //onPageChange={onPageChange} 
                    //onSortChange={onSortChange} 
                >
                    <TableHeaderColumn
                        isKey
                        dataField="carnet"
                        dataSort
                    >
                        Carnet
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ 
                            editar: "estudiantes", 
                            ver: "estudiantes",
                            eliminar: eliminar })} 
                        
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </React.Fragment>
        );
    }
}

export default ListadoEstudiante;