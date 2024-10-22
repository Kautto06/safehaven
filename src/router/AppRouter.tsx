
import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Route ,Redirect} from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { IonReactRouter } from "@ionic/react-router";
import Expertos from "../pages/Expertos";
import Foro from "../pages/Foro";
import Notificaciones from "../pages/Notificaciones";
import Denuncia from "../pages/Denuncia";
import Actividades from "../pages/Actividades";
import Autoevaluacion from "../pages/Autoevaluacion";
import Calendario from "../pages/Calendario";
import Home from "../pages/Home";

const AppRouter: React.FC = () =>{
    return(
        <IonReactRouter>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/expertos" component={Expertos}/>
            <Route exact path="/foro" component={Foro}/>
            <Route exact path="/notificaciones" component={Notificaciones}/>
            <Route exact path="/denuncia" component={Denuncia}/>
            <Route exact path="/actividades" component={Actividades}/>
            <Route exact path="/autoevaluacion" component={Autoevaluacion}/>
            <Route exact path="/calendario" component={Calendario}/>
            <Route exact path="/" component={Home}/>

        </IonReactRouter>
    )
}


export default AppRouter;