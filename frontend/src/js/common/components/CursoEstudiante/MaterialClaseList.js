import React, { Component, useReducer } from 'react';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class MaterialClaseList extends Component{
   
    render(){
        const { data, loader } = this.props;
        return(
            <div className="d-flex flex-column flex-1 mx-3">
                {data &&    
                    <Grid 
                        hover 
                        striped 
                        data={data} 
                        loading={loader} 
                        headerStyle={ { background: '#d2dbdc' } }
                        //onPageChange={listarEstudiantes} 
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
                               
                            })} 
                        >
                            Ver
                        </TableHeaderColumn>
                    </Grid>
                }
                </div>
            );
    }
}

export default MaterialClaseList;