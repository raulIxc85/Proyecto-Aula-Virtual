import React, { cloneElement, Component } from 'react';
import { listar } from '../../../../redux/modules/tarea/tarea';
import Grid from '../../Utils/Grid';
import { standardActions } from '../../Utils/Grid/StandardActions';

class TareasEntregasList extends Component{
    componentWillMount = () => {
        const { listarTareasEntregadas, match } = this.props;
        const id = match.params.id;
        listarTareasEntregadas(id);
        
    }
    render(){
        const { data, loader, match, eliminar } = this.props;
        const id = match.params.id;
       
        return(
            <React.Fragment>
                <center><h3>Tareas enviadas</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href={`/#/cursos-asignados/${id}/tareas`}
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
                            isKey
                            dataField="estudiante"
                            dataSort
                            dataFormat={(cell, row)=>{
                                if ( cell === undefined ){
                                    return "";
                                }else{
                                    return cell.texto;
                                }
                                
                            }}
                        >
                            Respuesta
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="estudiante"
                            dataAlign="center"
                            dataSort
                            dataFormat={(cell, row)=>{
                                if ( cell === undefined ){
                                    return "";
                                }else {
                                    if (!(cell.archivo === null)){
                                        return (<a href={cell.archivo} target="_blank" >ver archivo</a>);
                                    }
                                }
                                    
                            }}
                        >
                            Archivo Adjunto
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="estudiante"
                            dataAlign="center"
                            dataSort
                            dataFormat={(cell, row)=>{
                                if ( cell === undefined ){
                                    return "";
                                }else{
                                    let ruta = window.location.href;
                                    return (<a className='btn btn-outline-primary btn-sm' href={ruta+cell.id}>Nota</a>);
 
                                }
                            }}
                        >
                            Calificar tarea
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default TareasEntregasList;