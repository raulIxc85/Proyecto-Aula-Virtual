import React, { Component, useReducer } from 'react';
import { listarEstudiantes } from '../../../redux/modules/asignacionEstudiante/asignacionEstudiante';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoEstudiantes extends Component{
   
    render(){
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <div className="mb-4 card card-small">
                <div className="border-bottom card-header"><center><h5 className="m-0">Estudiantes</h5></center></div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="d-flex flex-column flex-1 mx-3">
                        {data &&    
                            <Grid 
                                hover 
                                striped 
                                data={data} 
                                loading={loader} 
                                onPageChange={listarEstudiantes} 
                                //onSortChange={onSortChange} 
                            >
                                <TableHeaderColumn
                                    dataField="estudiante"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        return cell.carnet;
                                    }}
                                >
                                    Carnet
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField="estudiante"
                                    dataSort
                                    dataFormat={(cell, row)=>{
                                        return cell.perfil.nombres + " " + cell.perfil.apellidos;
                                    }}
                                >
                                    Estudiante
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    isKey
                                    dataField="id"
                                    dataAlign="center"
                                    dataSort
                                    dataFormat={standardActions({ 
                                        eliminar: eliminar,
                                    })} 
                                    
                                >
                                    Quitar
                                </TableHeaderColumn>
                            </Grid>
                        }
                        </div>
                </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default ListadoEstudiantes;