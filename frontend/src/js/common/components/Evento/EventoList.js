import React, { Component } from 'react';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoEvento extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){
        const { data, loader, eliminar, listar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Eventos Registrados</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/eventos/crear'
                        className='btn btn-primary'
                    >
                        Crear Evento
                    </a>
                </div>
                {data &&
                    <Grid 
                        hover 
                        striped 
                        data={data} 
                        loading={loader} 
                        onPageChange={listar} 
                       
                    >
                        <TableHeaderColumn
                            isKey
                            dataField="titulo"
                            dataSort
                        >
                            Titulo
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="descripcion"
                            dataSort
                        >
                            Descripción
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                editar: "eventos", 
                                ver: "eventos",
                                eliminar: eliminar, 
                            })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default ListadoEvento;