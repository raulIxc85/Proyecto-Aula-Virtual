import React, { Component } from 'react';
import { listar } from '../../../../redux/modules/materialClase/materialClase';
import Grid from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';

class ListadoMaterialClase extends Component{
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
                <center><h3>Material de apoyo Registrado</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href={`/#/cursos-asignados/${id}/crear-material-curso`}
                        className='btn btn-primary mr-2 mb-3'
                    >
                        Crear Material
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
                            dataField="tituloMaterial"
                            dataSort
                        >
                            Titulo
                        </TableHeaderColumn>
                        <TableHeaderColumn
                           
                            dataField="descripcionMaterial"
                            dataSort
                        >
                            Descripcion
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            isKey
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                ver: "ver-material",
                                editar: "material", 
                                eliminar: eliminar
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

export default ListadoMaterialClase;