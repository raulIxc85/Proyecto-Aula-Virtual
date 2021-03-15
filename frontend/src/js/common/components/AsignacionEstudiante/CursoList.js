import React, { Component, useReducer } from 'react';
import { listarCursosCatedratico } from '../../../redux/modules/asignacionEstudiante/asignacionEstudiante';
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
                                if ( cell === undefined ){
                                    return "";
                                }else{
                                    return cell.nombre;
                                }
                                
                            }}
                        >
                            Curso
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="grado"
                            dataSort
                            dataFormat={(cell, row)=>{
                                if ( cell === undefined ){
                                    return "";
                                }else{
                                    return cell.descripcion;
                                }
                                
                            }}
                        >
                            Grado
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="seccion"
                            dataSort
                            dataFormat={(cell, row)=>{
                                if ( cell === undefined ){
                                    return "";
                                }else{
                                    return cell.descripcion;
                                }
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
                                asignar: "cursos-asignados",
                                gestion: "cursos-asignados",
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

export default ListadoCursosCatedratico;