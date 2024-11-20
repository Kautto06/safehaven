import { IonRouterOutlet, IonAlert } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router";
import { IonReactRouter } from "@ionic/react-router";
import { useAuthStore } from "../hooks";

import {
  Expertos,
  EditProfile,
  Home,
  UserProfile,
  CalendarComponent,
  Autoevaluacion,
  InformativaDenuncia,
  Actividades,
  Denuncia,
  Notificaciones,
  Foro,
  Login,
  Register,
  AutoevaluacionInfo,
  AdminPage,
  AdminTestAutoevaluacion,
  AdminForo,
  AdminExperts,
  AdminEvents,
  CrearPublicacion,
  DetallePost,
  AdminNotificacion,
  ResultadosAutoevaluacion,
  InformacionViolenciaGenero,
} from '../pages';

import { AdminDenuncias } from "../pages/admin/AdminDenuncia";
import { jwtDecode } from "jwt-decode";
import pageApi from "../api/backend";
import { onChecking } from "../store/auth/authSlice";

const AppRouter: React.FC = () => {
  const { status, checkAuthToken, tokenExpired, setTokenExpired } = useAuthStore();
  const location = useLocation();

  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    setIsTokenChecked(false);
    if (status === 'checking' && !isTokenChecked) {
      checkAuthToken();  // Verificar el token
      setIsTokenChecked(true);
    }
  }, [status, isTokenChecked, checkAuthToken]);

  const getUserEmail = (): string | null => {
    const token = localStorage.getItem('token'); // Ajusta el nombre del token según tu configuración
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.uid || null; // Asegúrate de que el token tenga un campo 'email'
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };

  const handleEstado = async () => {
    const email = getUserEmail();
    if (!email) return;
    
    try {
      const {data} = await pageApi.get(`/user/`, { params:{ email }});
      if (data.estado === 'Bloqueado') {
        localStorage.clear(); // Limpiar el localStorage
        window.location.href = '/login'; // Redirigir a la página de login
      }
      
    } catch (error) {
      console.error('Error al obtener el estado del usuario:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      handleEstado();  // Verificar el estado del usuario cuando esté autenticado
    }
  }, []);

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
            <Route exact path="/denuncia" component={InformativaDenuncia} />
            <Route exact path="/autoevaluacion" component={AutoevaluacionInfo} />
            <Route exact path="/autoevaluacion/formulario" component={Autoevaluacion} />
            <Route exact path="/resultados/:id_objeto" component={ResultadosAutoevaluacion} />
            <Route exact path="/calendario" component={CalendarComponent} />
            <Route exact path="/perfilUsuario" component={UserProfile} />
            <Route exact path="/editarPerfil" component={EditProfile} />
            <Route exact path="/foro/detalle/:id" component={DetallePost} />
            <Route exact path="/crearPublicacion" component={CrearPublicacion} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/admin/denuncias" component={AdminDenuncias} />
            <Route exact path="/admin/test" component={AdminTestAutoevaluacion} />
            <Route exact path="/admin/foro" component={AdminForo} />
            <Route exact path="/admin/expertos" component={AdminExperts} />
            <Route exact path="/admin/eventos" component={AdminEvents} />
            <Route exact path="/admin/notificacion" component={AdminNotificacion} />
            <Route exact path="/informacion" component={InformacionViolenciaGenero} />
            <Route exact path="/" component={Home} />
            <Redirect to={location.pathname} />
          </>
        ) : (
          <>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
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
