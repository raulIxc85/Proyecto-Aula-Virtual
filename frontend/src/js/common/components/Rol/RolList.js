import React, { Component } from 'react';
import { listar } from '../../../redux/modules/rol/rol';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoRol extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){
        console.log("PROPS en listado rol: ", this.props);
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Roles Registrados</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/roles/crear'
                        className='btn btn-primary'
                    >
                        Crear Rol
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
                            Rol
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                editar: "roles", 
                                ver: "roles", 
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

export default ListadoRol;