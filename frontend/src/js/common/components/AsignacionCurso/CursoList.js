import React, { Component, useReducer } from 'react';
import { listarCursosCatedratico } from '../../../redux/modules/asignacionCatedratico/asignacion';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoCursosCatedratico extends Component{
    componentWillMount = () => {
        const { listarCursosCatedratico } = this.props;
        listarCursosCatedratico();
    }
    render(){
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Cursos</h3></center>
                {data &&
                    <Grid 
                        hover 
                        striped 
                        data={data} 
                        loading={loader} 
                        onPageChange={listarCursosCatedratico} 
                        //onSortChange={onSortChange} 
                    >
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
                            })} 
                            
                        >
                            Asignación
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default ListadoCursosCatedratico;