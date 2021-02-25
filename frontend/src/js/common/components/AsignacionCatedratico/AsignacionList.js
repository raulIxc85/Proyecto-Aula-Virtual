import React, { Component, useReducer } from 'react';
import { listar } from '../../../redux/modules/asignacionCatedratico/asignacion';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoAsignacion extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){
        const { data, loader, eliminar } = this.props;
        
        return(
            <React.Fragment>
                <center><h3>Asignaciones</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/asignaciones-catedratico/crear'
                        className='btn btn-primary'
                    >
                        Crear Asignación
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
                            dataField="catedratico"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.perfil.nombres + " " + cell.perfil.apellidos;
                            }}
                        >
                            Catedratico
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="curso"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.descripcion;
                            }}
                        >
                            Curso
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="grado"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.descripcion;
                            }}
                        >
                            Grado
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="seccion"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.descripcion;
                            }}
                        >
                            Seccion
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            isKey
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                ver: "asignaciones-catedratico",
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

export default ListadoAsignacion;