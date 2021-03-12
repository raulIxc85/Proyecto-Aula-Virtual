import React, { Component, useReducer } from 'react';
import moment from 'moment';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class TareaClaseList extends Component{
   
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
                            dataField="tituloTarea"
                            dataSort
                        >
                            Titulo
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="fechaHoraEntrega"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return moment(cell).format("DD-MM-YYYY");
                            }}
                        >
                            Entrega
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            headerAlign="center"
                            dataAlign="right"
                            dataField="valorTarea"
                            dataSort
                        >   
                            Valor
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            isKey
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ 
                                tarea: "ver-tarea-entrega",
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

export default TareaClaseList;