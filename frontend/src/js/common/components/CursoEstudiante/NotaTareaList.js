import React, { Component, useReducer } from 'react';
import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class NotaTareaList extends Component{
    
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
                            isKey
                            dataField="tarea"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.tituloTarea;
                            }}
                        >
                            Titulo
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            headerAlign="center"
                            dataField="tarea"
                            dataAlign="right"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.valorTarea;
                            }}
                        >
                            Valor Tarea
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            headerAlign="center"
                            dataAlign="right"
                            dataField="estudiante"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.notaTarea;
                            }}
                        >
                            Nota obtenida 
                        </TableHeaderColumn>
                    </Grid>
                }
                </div>
            );
    }
}

export default NotaTareaList;