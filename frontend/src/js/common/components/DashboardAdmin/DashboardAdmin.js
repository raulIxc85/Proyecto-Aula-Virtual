import React, { Component } from 'react';
import Grid from "../Utils/Grid";

class DashboardAdmin extends Component {
    componentWillMount = () => {
        const { mostrar } = this.props;
        mostrar();
    }
    render() {
        const { lecturaDatos, lecturaNiveles } = this.props;

        return (
            
            <div className="page-header py-4 no-gutters row">
                <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-12">
                    <span
                        className="text-uppercase page-subtitle">Dashboard
                    </span>
                    <br />
                    <br />
                    <div className="row ml-0">
                    <div className="col-sm-4">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Ciclo Escolar</label>
                                        <div className="text-center">
                                            <h1>{lecturaDatos.ciclo}</h1>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="mb-4 card card-small">
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="d-flex flex-column flex-1 mx-3">
                                <label>Usuarios Registrados</label>
                                <table className="table">
                                    <tr>
                                        <td><label className="text-primary">Total Usuarios sistema: </label> </td>
                                        <td><label >{lecturaDatos.cantidadUser}</label></td>
                                   </tr>
                                   <tr>
                                        <td><label className="text-primary">Total Catedraticos: </label> </td>
                                        <td><label >{lecturaDatos.cantidadCatedratico}</label></td>
                                   </tr>
                                   <tr>
                                        <td><label className="text-primary">Total Estudiantes: </label> </td>
                                        <td><label >{lecturaDatos.cantidadEstudiante}</label></td>
                                   </tr>
                                </table>
                              </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row ml-0">
                        <div className="col-sm-4">
                            <div className="mb-4 card card-small">
                                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                        <div className="d-flex flex-column flex-1 mx-3">
                                            <label>Grados</label>
                                            <div className="text-center">
                                                <h2>{lecturaDatos.cantidadGrados}</h2>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-4 card card-small">
                                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                    <div className="d-flex flex-column flex-1 mx-3">
                                        <label htmlFor="ciclo">Secciones</label>
                                        <div className="text-center">
                                            <h2>{lecturaDatos.cantidadSecciones}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    <div className="col-sm-4">
                        <div className="mb-4 card card-small">
                            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                                <div className="d-flex flex-column flex-1 mx-3">
                                    <label>Niveles</label>
                                    <div className="p-0 px-3 pt-3">
                                    <Grid 
                                        data={lecturaNiveles}
                                        headerStyle={ { background: '#d2dbdc' } } 
                                    >
                                        <TableHeaderColumn
                                            isKey
                                            dataAlign='center'
                                            headerAlign="center"
                                            dataField="nombre"
                                            dataSort
                                        >
                                          Nivel
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

export default DashboardAdmin;
