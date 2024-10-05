
import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Route ,Redirect} from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { IonReactRouter } from "@ionic/react-router";
import Expertos from "../pages/Expertos";
import Foro from "../pages/Foro";
import Notificaciones from "../pages/Notificaciones";

const AppRouter: React.FC = () =>{
    return(
        <IonReactRouter>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/expertos" component={Expertos}/>
            <Route exact path="/foro" component={Foro}/>
            <Route exact path="/notificaciones" component={Notificaciones}/>
            <Route exact path="/">
                <Redirect to="/login"/>
            </Route>
        </IonReactRouter>
    )
}


export default AppRouter;