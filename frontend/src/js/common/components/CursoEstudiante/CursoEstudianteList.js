import React, { Component, useReducer } from 'react';
import { listarCursosEstudiante } from '../../../redux/modules/asignacionEstudiante/asignacionEstudiante';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class CursoEstudianteList extends Component{
    componentWillMount = () => {
        const { listarCursosEstudiante } = this.props;
        listarCursosEstudiante();
    }
    render(){
        const { data, loader } = this.props;
        return(
            <React.Fragment>
                <center><h3>Cursos</h3></center>
                {data &&
                    <Grid 
                        hover 
                        striped 
                        data={data} 
                        loading={loader} 
                        onPageChange={listarCursosEstudiante} 
                        //onSortChange={onSortChange} 
                    >
                        <TableHeaderColumn
                            dataField="asignacionCatedratico"
                            dataSort
                            dataFormat={(cell, row)=>{
                                if ( cell === undefined ){
                                    return "";
                                }else{
                                    if (cell.length>0){
                                        return cell[0].grado.descripcion;
                                    }
                                }
                                
                            }}
                        >
                            Grado
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="asignacionCatedratico"
                            dataSort
                            dataFormat={(cell, row)=>{
                                if ( cell === undefined ){
                                    return "";
                                }else{
                                    if (cell.length>0){
                                        return cell[0].curso.nombre;
                                    }
                                }
                            }}
                        >
                            Curso
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="asignacionCatedratico"
                            dataSort
                            dataFormat={(cell, row)=>{
                                if ( cell === undefined ){
                                    return "";
                                }else{
                                    if (cell.length>0){
                                        return cell[0].seccion.descripcion;
                                    }
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
                                portada: "cursos-asignados-estudiante",
                            })} 
                            
                        >
                            Seleccionar
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default CursoEstudianteList;