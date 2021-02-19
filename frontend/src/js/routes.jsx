import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
//cambio de password
import ProtectedRoutePass from './ProtectedRoutePass';

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

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                
                <ProtectedRoutePass exact path="/cambio-password" component={CambioPasswordContainer} />
                
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

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
