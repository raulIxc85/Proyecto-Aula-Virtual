import React, { Component } from 'react';
import { listar } from '../../../../redux/modules/tarea/tarea';
import Grid from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';

class ListadoTarea extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
        
    }
    render(){
        const { data, loader, match } = this.props;
        const id = match.params.id;
       
        return(
            <React.Fragment>
                <center><h3>Tareas Registradas</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href={`/#/cursos-asignados/${id}/crear-tarea`}
                        className='btn btn-primary'
                    >
                        Crear Tarea
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
                            })}
                        >
                            Acción
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default ListadoTarea;