import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile } from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';

import ProtectedRoute from './ProtectedRoute';
//cambio de password
import ProtectedRoutePass from './ProtectedRoutePass';
//catedratico
import ProtectedRouteCatedratico from './ProtectedRouteCatedratico';
//estudiante
import ProtectedRouteEstudiante from './ProtectedRouteEstudiante';


import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

//importar componentes
import RolListaContainer from './common/components/Rol/RolListContainer';
import RolCrearContainer from './common/components/Rol/RolCrearContainer';
import EstudianteCrearContainer from './common/components/Estudiante/EstudianteCrearContainer';
import EstudianteListaContainer from './common/components/Estudiante/EstudianteListContainer';
import ProfesionCrearContainer from './common/components/Profesion/ProfesionCrearContainer';
import ProfesionListaContainer from './common/components/Profesion/ProfesionListContainer';
import CatedraticoCrearContainer from './common/components/Catedratico/CatedraticoCrearContainer';
import CatedraticoListaContainer from './common/components/Catedratico/CatedraticoListContainer';
import CambioPasswordContainer from './common/components/LoginRegister/CambioPassword/CambioPasswordContainer';
import EditarPasswordContainer from './common/components/LoginRegister/CambioPassword/EditarPasswordContainer';
import NivelCrearContainer from './common/components/Nivel/NivelCrearContainer';
import NivelListaContainer from './common/components/Nivel/NivelListContainer';
import GradoCrearContainer from './common/components/Grado/GradoCrearContainer';
import GradoListaContainer from './common/components/Grado/GradoListContainer';
import SeccionCrearContainer from './common/components/Seccion/SeccionCrearContainer';
import SeccionListaContainer from './common/components/Seccion/SeccionListContainer';
import CicloCrearContainer from './common/components/Ciclo/CicloCrearContainer';
import CicloListaContainer from './common/components/Ciclo/CicloListContainer';
import CursoCrearContainer from './common/components/Curso/CursoCrearContainer';
import CursoListaContainer from './common/components/Curso/CursoListContainer';
import AsignacionCrearContainer from './common/components/AsignacionCatedratico/AsignacionCrearContainer';
import AsignacionListaContainer from './common/components/AsignacionCatedratico/AsignacionListContainer';
import AsignacionCursoListaContainer from './common/components/AsignacionEstudiante/CursoListContainer';
import AsignacionEstudianteCrearContainer from './common/components/AsignacionEstudiante/AsignarEstudianteCrearContainer';
import GestionCursoContainer from './common/components/GestionCursoCatedratico/GestionCursoContainer';
import TareaCrearContainer from './common/components/GestionCursoCatedratico/Tarea/TareaCrearContainer';
import TareaListaContainer from './common/components/GestionCursoCatedratico/Tarea/TareaListContainer';
import MaterialClaseCrearContainer from './common/components/GestionCursoCatedratico/MaterialClase/MaterialClaseCrearContainer';
import MaterialClaseListaContainer from './common/components/GestionCursoCatedratico/MaterialClase/MaterialClaseListContainer';
import CursoEstudianteListaContainer from './common/components/CursoEstudiante/CursoEstudienteListContainer';
import CursoEstudiantePortadaContainer from './common/components/CursoEstudiante/PortadaCursoContainer';
import TareaEntregaContainer from './common/components/CursoEstudiante/EntregaTarea/TareaEntregaContainer';
import TareaEntregadaListaContainer from './common/components/GestionCursoCatedratico/CalificarTarea/TareasEntregadasListContainer';
import CalificarTareaContainer from './common/components/GestionCursoCatedratico/CalificarTarea/CalificarTareaContainer';
import DashboardAdminContainer from './common/components/DashboardAdmin/DashboardAdminContainer';
import EventoCrearContainer from './common/components/Evento/EventoCrearContainer';
import EventoListaContainer from './common/components/Evento/EventoListContainer';
import DashboardCatedraticoContainer from './common/components/DashboardCatedratico/DashboardCatedraticoContainer';
import DashboardEstudianteContainer from './common/components/DashboardEstudiante/DashboardEstudianteContainer';
import EnviarCorreoContainer from './common/components/LoginRegister/CambiarPassword/EnviarCorreoContainer';
import ConfirmacionEnvio from './common/components/LoginRegister/CambiarPassword/ConfirmacionEnvio';
import CambiarPasswordContainer from './common/components/LoginRegister/CambiarPassword/CambiarPasswordContainer';

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/cambiar-password" component={EnviarCorreoContainer} />
                <Route exact path="/confirmacion-envio" component={ConfirmacionEnvio} />
                <Route exact path="/validar_token/:id/:token" component={CambiarPasswordContainer} />
                
                <ProtectedRoute exact path="/" component={DashboardAdminContainer} />
                <ProtectedRouteCatedratico exact path="/home" component={DashboardCatedraticoContainer} />
                <ProtectedRouteEstudiante exact path="/home-estudiante" component={DashboardEstudianteContainer} />
                
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/edit-user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                
                <ProtectedRoutePass exact path="/cambio-password" component={CambioPasswordContainer} />
                <ProtectedRoute exact path="/cambiopassword" component={EditarPasswordContainer} />
                

                <ProtectedRoute exact path="/roles/crear" component={RolCrearContainer} />
                <ProtectedRoute exact path="/roles/:id" component={RolCrearContainer} />
                <ProtectedRoute exact path="/roles/:id/editar" component={RolCrearContainer} />
                <ProtectedRoute exact path="/roles" component={RolListaContainer} />
                
                <ProtectedRoute exact path="/estudiantes/crear" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiantes/:id" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiantes/:id/editar" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiantes" component={EstudianteListaContainer} />

                <ProtectedRoute exact path="/profesiones/crear" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesiones/:id" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesiones/:id/editar" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesiones" component={ProfesionListaContainer} />

                <ProtectedRoute exact path="/catedraticos/crear" component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path="/catedraticos/:id" component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path="/catedraticos/:id/editar" component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path="/catedraticos" component={CatedraticoListaContainer} />

                <ProtectedRoute exact path="/niveles/crear" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/niveles/:id" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/niveles/:id/editar" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/niveles" component={NivelListaContainer} />

                <ProtectedRoute exact path="/grados/crear" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grados/:id" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grados/:id/editar" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grados" component={GradoListaContainer} />

                <ProtectedRoute exact path="/secciones/crear" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/secciones/:id" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/secciones/:id/editar" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/secciones" component={SeccionListaContainer} />

                <ProtectedRoute exact path="/ciclos/crear" component={CicloCrearContainer} />
                <ProtectedRoute exact path="/ciclos/:id" component={CicloCrearContainer} />
                <ProtectedRoute exact path="/ciclos/:id/editar" component={CicloCrearContainer} />
                <ProtectedRoute exact path="/ciclos" component={CicloListaContainer} />

                <ProtectedRoute exact path="/cursos/crear" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/cursos/:id" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/cursos/:id/editar" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/cursos" component={CursoListaContainer} />

                <ProtectedRoute exact path="/asignaciones-catedratico/crear" component={AsignacionCrearContainer} />
                <ProtectedRoute exact path="/asignaciones-catedratico/:id" component={AsignacionCrearContainer} />
                <ProtectedRoute exact path="/asignaciones-catedratico/:id/editar" component={AsignacionCrearContainer} />
                <ProtectedRoute exact path="/asignaciones-catedratico" component={AsignacionListaContainer} />

                <ProtectedRouteCatedratico exact path="/cursos-asignados" component={AsignacionCursoListaContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id" component={AsignacionEstudianteCrearContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/admin-curso" component={GestionCursoContainer} />
                
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/crear-tarea" component={TareaCrearContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/tareas" component={TareaListaContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/ver-tarea/:id_tarea" component={TareaCrearContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/tareas/:id_tarea/editar" component={TareaCrearContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/admin-tarea/:id_tarea" component={TareaEntregadaListaContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/admin-tarea/:id_tarea/:id_entrega" component={CalificarTareaContainer} />
                
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/crear-material-curso" component={MaterialClaseCrearContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/material" component={MaterialClaseListaContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/ver-material/:id_material" component={MaterialClaseCrearContainer} />
                <ProtectedRouteCatedratico exact path="/cursos-asignados/:id/material/:id_material/editar" component={MaterialClaseCrearContainer} />
                
                <ProtectedRouteEstudiante exact path="/cursos-asignados-estudiante" component={CursoEstudianteListaContainer} />
                <ProtectedRouteEstudiante exact path="/cursos-asignados-estudiante/:id/ver-curso-estudiante" component={CursoEstudiantePortadaContainer} />
                <ProtectedRouteEstudiante exact path="/cursos-asignados-estudiante/:id/ver-tarea-entrega/:id_tarea" component={TareaEntregaContainer} />
                
                <ProtectedRoute exact path="/eventos/crear" component={EventoCrearContainer} />
                <ProtectedRoute exact path="/eventos/:id" component={EventoCrearContainer} />
                <ProtectedRoute exact path="/eventos/:id/editar" component={EventoCrearContainer} />
                <ProtectedRoute exact path="/eventos" component={EventoListaContainer} />

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
