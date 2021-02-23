import React, { Component } from 'react';
import { listar } from '../../../redux/modules/ciclo/ciclo';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoCiclo extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
        
    }
    render(){
        const { data, loader } = this.props;
        return(
            <React.Fragment>
                <center><h3>Ciclos Registrados</h3></center>
                <div className="d-flex flex-row justify-content-start mb-2">
                    <a
                        href='/#/ciclos/crear'
                        className='btn btn-primary'
                    >
                        Crear Ciclo
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
                            dataField="ciclo"
                            dataSort
                        >
                            Ciclo
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                ver: "ciclos", 
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

export default ListadoCiclo;