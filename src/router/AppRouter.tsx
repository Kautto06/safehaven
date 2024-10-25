import { IonRouterOutlet, IonAlert } from "@ionic/react";
import React, { useEffect } from "react";
import { Route, Redirect } from "react-router";
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
import { useAuthStore } from '../hooks/useAuthStore';

const AppRouter: React.FC = () => {
    const { status, checkAuthToken, tokenExpired, setTokenExpired } = useAuthStore();
  
    useEffect(() => {
      const verifyToken = async () => {
        await checkAuthToken();
      };
  
      // Solo llamar a verifyToken si el estado es 'checking'
      if (status === 'checking') {
        verifyToken();
      }
    }, [status, checkAuthToken]); // Asegúrate de incluir `status` en las dependencias
  
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
              <Route exact path="/denuncia" component={Denuncia} />
              <Route exact path="/actividades" component={Actividades} />
              <Route exact path="/autoevaluacion" component={Autoevaluacion} />
              <Route exact path="/calendario" component={Calendario} />
              <Route exact path="/" component={Home} />
              <Redirect to="/" />
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
