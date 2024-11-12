import { IonRouterOutlet, IonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router";
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
import PerfilUsuario from "../pages/PerfilUsuario";
import EditarPerfil from "../pages/EditarPerfil";

import { useAuthStore } from '../hooks/useAuthStore';
import AutoevaluacionInfo from "../pages/InfoAutoevaluacion";
import InformativaDenuncia from "../pages/InfoDenuncia";


const AppRouter: React.FC = () => {
    const { status, checkAuthToken, tokenExpired, setTokenExpired } = useAuthStore();
    const location = useLocation();

    const [isTokenChecked, setIsTokenChecked] = useState(false);

    useEffect(() => {
      // Solo verificar el token si está en 'checking' y no hemos verificado el token aún
      if (status === 'checking' && !isTokenChecked) {
          checkAuthToken();
          setIsTokenChecked(true); // Marcar como verificado
      }
  }, [status, checkAuthToken, isTokenChecked]); // Asegúrate de incluir `status` en las dependencias
  
    // Mensaje de carga mientras se verifica el estado de autenticación
    if (status === 'checking') {
      return <div>Cargando...</div>;
    }
  
    return (
      <IonReactRouter>
        <IonRouterOutlet>
          {status === 'authenticated' ? (
            <>
              <Route exact path="/expertos" component={Expertos} />
              <Route exact path="/foro" component={Foro} />
              <Route exact path="/notificaciones" component={Notificaciones} />
              <Route exact path="/denuncia/formulario" component={Denuncia} />
              <Route exact path="/actividades" component={Actividades} />
              <Route exact path="/denuncia" component={InformativaDenuncia}/>
              <Route exact path="/autoevaluacion" component={AutoevaluacionInfo}/>
              <Route exact path="/autoevaluacion/formulario" component={Autoevaluacion} />
              <Route exact path="/calendario" component={Calendario} />
              <Route exact path="/PerfilUsuario" component={PerfilUsuario} />
              <Route exact path="/EditarPerfil" component={EditarPerfil} />
              <Route exact path="/" component={Home} />
              
              <Redirect to= {location.pathname}/>
            </>
          ) : (
            <>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Redirect to="/login" />
            </>
          )}
        </IonRouterOutlet>
  
        {/* Mensaje de token expirado */}
        <IonAlert
          isOpen={tokenExpired}
          onDidDismiss={() => setTokenExpired(false)}
          header="Token Expirado"
          message="Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
          buttons={['OK']}
        />
      </IonReactRouter>
    );
  };
  
export default AppRouter;
