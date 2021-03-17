import React, { Component } from 'react';
import Grid from "../Utils/Grid";

class DashboardCatedratico extends Component {
    componentWillMount = () => {
        const { mostrar } = this.props;
        mostrar();
    }
    render() {
        const { lecturaCursos, lecturaEventos } = this.props;

        return (
            
            <div className="page-header py-4 no-gutters row">
                <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-12">
                    <span
                        className="text-uppercase page-subtitle">Dashboard Catedratico
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
                                    <div className="p-0 px-3 pt-3">
                                    <Grid 
                                        data={lecturaEventos} 
                                        headerStyle={ { background: '#d2dbdc' } }
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
                    
                    <div className="col-sm-4">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Tareas Pendientes de calificar</label>
                                    <div className="p-0 px-3 pt-3">
                                    
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

export default DashboardCatedratico;
