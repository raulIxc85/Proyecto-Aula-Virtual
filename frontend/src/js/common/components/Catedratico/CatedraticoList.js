import React, { Component, useReducer } from 'react';
import { listar } from '../../../redux/modules/catedratico/catedratico';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoCatedratico extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){
        console.log("PROPS en listado catedratico: ", this.props);
        const { data, loader, eliminar } = this.props;
        
        return(
            <React.Fragment>
                <center><h3>Catedráticos Registrados</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/catedraticos/crear'
                        className='btn btn-primary'
                    >
                        Crear Catedrático
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
                            dataField="activo"
                            dataSort
                        >
                            Carnet
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField="perfil"
                            dataSort
                            dataFormat={(cell, row)=>{
                                console.log("datos",row);
                                return cell.nombres;
                            }}
                        >
                            Nombres
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="perfil"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.apellidos;
                            }}
                        >
                            Apellidos
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                editar: "catedraticos", 
                                ver: "catedraticos",
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

export default ListadoCatedratico;