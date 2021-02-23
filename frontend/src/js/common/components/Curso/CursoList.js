import React, { Component } from 'react';
import { listar } from '../../../redux/modules/curso/curso';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoCurso extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Cursos Registrados</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/cursos/crear'
                        className='btn btn-primary'
                    >
                        Crear Cursos
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
                            isKey
                            dataField="nombre"
                            dataSort
                        >
                            Curso
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                editar: "cursos", 
                                ver: "cursos",
                                eliminar: eliminar, 
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

export default ListadoCurso;