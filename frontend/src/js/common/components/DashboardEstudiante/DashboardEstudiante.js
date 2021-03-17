import React, { Component } from 'react';
import Grid from "../Utils/Grid";
import moment from 'moment';

class DashboardEstudiante extends Component {
    componentWillMount = () => {
        const { mostrar } = this.props;
        mostrar();
    }
    render() {
        const { lecturaCursos, lecturaEventos, lecturaTareas } = this.props;

        return (
            
            <div className="page-header py-4 no-gutters row">
                <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-12">
                    <span
                        className="text-uppercase page-subtitle">Dashboard Estudiante
                    </span>
                    <br />
                    <br />
                    
                    <div className="col-sm-8">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Cursos Asignados</label>
                                    <div className="p-0 px-3 pt-3">
                                    <Grid 
                                        data={lecturaCursos} 
                                        headerStyle={ { background: '#d2dbdc' } }
                                    >
                                        <TableHeaderColumn
                                            isKey
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
                                                    return cell[0].seccion.descripcion;
                                                }
                                            }           
                                        }}
                                        >
                                            Seccion
                                        </TableHeaderColumn>
                                    </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Eventos Próximos</label>
                                    <div className="p-0 px-3 pt-3 mb-4" >
                                    <Grid 
                                        data={lecturaEventos} 
                                        headerStyle={ { background: '#d2dbdc' } }
                                        pagination={false}
                                    >
                                        <TableHeaderColumn
                                            isKey
                                            dataAlign="center"
                                            dataField="descripcion"
                                            dataSort
                                        >
                                            Evento
                                        </TableHeaderColumn>
                                        
                                    </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-8">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Tareas próximas a entregar</label>
                                    <div className="p-0 px-3 pt-3 mb-4">
                                    <Grid 
                                        data={lecturaTareas} 
                                        headerStyle={ { background: '#d2dbdc' } }
                                        pagination={false}
                                    >
                                        <TableHeaderColumn
                                            isKey
                                            dataField="tituloTarea"
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
                                            dataField="fechaHoraEntrega"
                                            dataAlign="center"
                                            dataSort
                                            dataFormat={(cell, row)=>{
                                                return moment(cell).format("DD-MM-YYYY");
                                            }}
                                        >
                                            Fecha Entrega
                                        </TableHeaderColumn>
                                        
                                    </Grid>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div> 
    
        );
    }
}

export default DashboardEstudiante;
