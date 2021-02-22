import React, { Component, useReducer } from 'react';
import { listar } from '../../../redux/modules/grado/grado';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoGrado extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){
        const { data, loader, eliminar } = this.props;
        
        return(
            <React.Fragment>
                <center><h3>Grados Registrados</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/grados/crear'
                        className='btn btn-primary'
                    >
                        Crear Grado
                    </a>
                </div>
                {data &&
                    <Grid 
                        hover 
                        striped 
                        data={data} 
                        loading={loader} 
                        onPageChange={listar} 
                        //onSortChange={onSortChange} 
                    >
                        <TableHeaderColumn
                            isKey
                            dataField="descripcion"
                            dataSort
                        >
                            Grado
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField="nivel"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.nombre;
                            }}
                        >
                            Nivel
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                editar: "grados", 
                                ver: "grados",
                                eliminar: eliminar })} 
                            
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default ListadoGrado;