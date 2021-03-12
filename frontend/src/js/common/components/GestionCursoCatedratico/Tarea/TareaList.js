import React, { Component } from 'react';
import { listar } from '../../../../redux/modules/tarea/tarea';
import Grid from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';

class ListadoTarea extends Component{
    componentWillMount = () => {
        const { listar, match } = this.props;
        const id = match.params.id;
        listar(id);
        
    }
    render(){
        const { data, loader, match, eliminar } = this.props;
        const id = match.params.id;
       
        return(
            <React.Fragment>
                <center><h3>Tareas Registradas</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href={`/#/cursos-asignados/${id}/crear-tarea`}
                        className='btn btn-primary mr-2 mb-3'
                    >
                        Crear Tarea
                    </a>
                    <a
                        href={`/#/cursos-asignados/${id}/admin-curso`}
                        className='btn btn-secondary mb-3'
                    >
                        Regresar
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
                            dataField="tituloTarea"
                            dataSort
                        >
                            Tarea
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            headerAlign="center"
                            dataAlign="right"
                            dataField="valorTarea"
                            dataSort
                        >
                            Valor Tarea
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            isKey
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                ver: "ver-tarea",
                                editar: "tareas", 
                                eliminar: eliminar,
                            })}
                        >
                            Acción
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            width="140"
                            dataFormat={standardActions({ 
                                adminTarea: "admin-tarea",
                            })}
                        >
                            Ver Tareas
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default ListadoTarea;