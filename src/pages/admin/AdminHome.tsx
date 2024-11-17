import React from "react";
import { IonPage } from "@ionic/react";
import '../../assets/admin/AdminHome.css'
import logo from '../../assets/logos/logoNoBackground.png'

export const AdminPage: React.FC = () => {
  const sections = [
    { title: "Denuncias Anónimas", description: "Revisar y clasificar denuncias", route: "/admin/denuncias" },
    { title: "Test de Autoevaluación", description: "Gestionar preguntas y estadísticas", route: "/admin/test" },
    { title: "Foro de Apoyo", description: "Moderación del foro", route: "/admin/foro" },
    { title: "Atención en Línea", description: "Gestionar disponibilidad de profesionales", route: "/admin/atencion" },
    { title: "Calendario de Eventos", description: "Administrar eventos", route: "/admin/calendario" },
    { title: "Notificaciones", description: "Personalizar notificaciones", route: "/admin/notificaciones" },
    { title: "Tu Actividad", description: "Ver estadísticas globales de actividad", route: "/admin/actividad" },
  ];

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
      </div>
    </IonPage>
  );
};

