import React, { Component } from 'react';
import { listar } from '../../../redux/modules/profesion/profesion';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoProfesion extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
        
    }
    render(){
        console.log("PROPS en listado profesion: ", this.props);
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Profesiones Registradas</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/profesiones/crear'
                        className='btn btn-primary'
                    >
                        Crear Profesión
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
                            Profesión
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                editar: "profesiones", 
                                ver: "profesiones", 
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

export default ListadoProfesion;