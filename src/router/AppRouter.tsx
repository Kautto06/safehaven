import { IonRouterOutlet, IonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router";

import { IonReactRouter } from "@ionic/react-router";
import { useAuthStore } from "../hooks";
import {Expertos,EditProfile, Home, UserProfile, CalendarComponent, Autoevaluacion, InformativaDenuncia, Actividades, Denuncia, Notificaciones, Foro, Login, Register, AutoevaluacionInfo, } from '../pages';






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
              <Route exact path="/calendario" component={CalendarComponent} />
              <Route exact path="/PerfilUsuario" component={UserProfile} />
              <Route exact path="/EditarPerfil" component={EditProfile} />
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
