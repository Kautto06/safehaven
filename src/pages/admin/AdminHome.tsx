import React from "react";
import { IonPage } from "@ionic/react";
import '../../assets/admin/AdminHome.css'
import logo from '../../assets/logos/logoNoBackground.svg'
import { useHistory } from "react-router";

export const AdminPage: React.FC = () => {
  const history = useHistory()
  const sections = [
    { title: "Denuncias Anónimas", description: "Revisar y clasificar denuncias", route: "/admin/denuncias" },
    { title: "Test de Autoevaluación", description: "Gestionar preguntas y estadísticas", route: "/admin/test" },
    { title: "Foro de Apoyo", description: "Moderación del foro", route: "/admin/foro" },
    { title: "Expertos", description: "Gestionar disponibilidad de profesionales", route: "/admin/expertos" },
    { title: "Calendario de Eventos", description: "Administrar eventos", route: "/admin/eventos" },
    { title: "Notificaciones", description: "Monitorear notificaciones del sistema", route: "/admin/notificacion" },
  ];

  const handleLogout = () => {
    // Aquí puedes implementar la lógica para salir del modo admin y redirigir al home
    window.location.href ="/";  // Redirige a la página principal
  };

  return (
    <IonPage>
      <div className="admin-page">
        <header className="admin-header">
          <h1>Panel de Administración de SafeHaven</h1>
        </header>

        <img src={logo} className="icon-image"/>

        <main className="admin-main">
          <div className="admin-grid">
            {sections.map((section, index) => (
              <section key={index} className="admin-card" onClick={() => (window.location.href = section.route)}>
                <h2 className="admin-card-title">{section.title}</h2>
                <p className="admin-card-description">{section.description}</p>
              </section>
            ))}
          </div>
        </main>

        {/* Botón para volver al inicio y salir del modo admin */}
        <div className="admin-logout-container">
          <button className="admin-logout-button" onClick={handleLogout}>
            Volver al Inicio
          </button>
        </div>
      </div>
    </IonPage>
  );
};
