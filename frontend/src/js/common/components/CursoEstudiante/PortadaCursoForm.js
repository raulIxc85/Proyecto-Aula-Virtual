import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

class PortadaCursoForm extends Component {
    
    render() {
        const { handleSubmit, lecturaCurso, setArchivo, imagenPortada } = this.props;
        console.log("portada: ", this.props);
        let nombreCurso;
        let grado;
        let seccion;
        let imagen;
        let catedratico;
        if (lecturaCurso === undefined || lecturaCurso === null) {
            nombreCurso="";
            grado="";
            seccion="";
            catedratico="";
        }else{
            lecturaCurso.results.forEach(datos=>{
                nombreCurso = datos.asignacionCatedratico[0].curso.nombre;
                grado = datos.asignacionCatedratico[0].grado.descripcion;
                seccion = "Sección: " + datos.asignacionCatedratico[0].seccion.descripcion;
                imagen = datos.asignacionCatedratico[0].imagenPortada;
                catedratico = "Catedrático: " + datos.asignacionCatedratico[0].catedratico.perfil.nombres +" "+ datos.asignacionCatedratico[0].catedratico.perfil.apellidos;
            })
        }
        return (
            <React.Fragment>
                <form action="" onSubmit={handleSubmit} className="py-4">
                    <h3>{nombreCurso}</h3>
                    <h4>{catedratico}</h4>
                    <h5>{grado}</h5>
                    <h5>{seccion}</h5>
                    
                    <div className="mb-4 card card-small">
                        <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                            <div className="d-flex flex-column flex-1 mx-3">
                                <div className="form-group has-feedback flex-1 mx-3">
                                    <img className="mx-auto d-block" src={imagen} height="200" alt="Imagen portada"/>
                                </div>
                                    
                            </div>
                        </div>
                            
                      
                    </div>
                    </form>
                    <div className="mb-4 card card-small">
                        <div className="p-0 px-3 pt-3">
                            <Tabs
                                defaultActiveKey="SEGUNDO_TOP"
                                tabBarPosition="top"
                                onChange={this.callback}
                                renderTabBar={() => <ScrollableInkTabBar />}
                                renderTabContent={() => <TabContent />}
                            >
                                <TabPane tab="Material Clase" key="PRINCIPAL_TOP">
                                    <div className="py-4 px-3">
                                        
                                    </div>
                                    </TabPane>
                                    <TabPane tab="Tareas" key="SEGUNDO_TOP">
                                        <div className="py-4 px-3">
                                        
                                        </div>
                                    </TabPane>
                                    
                            </Tabs>
                        </div>
                    </div>
           </React.Fragment>
        )
    }
}

export default reduxForm({
    form: 'portadaCursoForm', //identificador unico
})(PortadaCursoForm)
