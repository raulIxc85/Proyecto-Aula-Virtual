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
                        //onPageChange={} 
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
                            dataAlign="center"
                            dataField="archivo"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return (<div><a href={cell} target="_blank" >ver archivo</a></div>);
                            }}
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