import React, { Component } from 'react';
import { listar } from '../../../redux/modules/seccion/seccion';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoSeccion extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Secciones Registradas</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/secciones/crear'
                        className='btn btn-primary'
                    >
                        Crear Sección
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
                            Sección
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                editar: "secciones", 
                                ver: "secciones", 
                                eliminar: eliminar
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

export default ListadoSeccion;