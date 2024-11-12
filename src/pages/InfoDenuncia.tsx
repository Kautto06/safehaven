import React from 'react';
import Header from '../components/Header'; // Asumiendo que ya tienes el Header creado
import Footer from '../components/Footer'; // Asumiendo que ya tienes el Footer creado
import '../assets/InfoDenuncia.css'; // Importar los estilos
import { IonPage } from '@ionic/react';

const InformativaDenuncia: React.FC = () => {
  return (
    <IonPage>
        <div className="informativa-body">
        <Header />
        <main className='main-infoD'>
            <h1 className="informativa-title">Información sobre la Denuncia Anónima</h1>

            <section className="informativa-section">
            <h2>¿Por qué realizar una denuncia anónima?</h2>
            <p>
                Las denuncias anónimas son una herramienta importante para proteger tu identidad
                mientras contribuyes a la justicia. A través de este canal, podrás informar sobre
                situaciones de violencia sin temor a represalias. 
            </p>
            </section>

            <section className="informativa-section">
            <h2>Tipos de Violencia</h2>
            <ul>
                <li><strong>Psicológica:</strong> Manipulación mental, intimidación y control emocional.</li>
                <li><strong>Física:</strong> Golpes, empujones y cualquier otra forma de agresión física.</li>
                <li><strong>Sexual:</strong> Abusos sexuales o cualquier tipo de violencia sexual.</li>
                <li><strong>Económica:</strong> Control o privación de recursos económicos.</li>
                <li><strong>Verbal:</strong> Insultos, amenazas y lenguaje degradante.</li>
            </ul>
            </section>

            <section className="informativa-section">
            <h2>¿Qué información puedes incluir en la denuncia?</h2>
            <p>
                A continuación te indicamos algunos aspectos importantes que puedes incluir al realizar
                una denuncia:
            </p>
            <ul>
                <li>Tipo de violencia que has sufrido.</li>
                <li>Ubicación del incidente.</li>
                <li>Descripción detallada de lo sucedido.</li>
                <li>Relación con el agresor.</li>
                <li>Pruebas, si las tienes (esto es opcional).</li>
            </ul>
            </section>

            <section className="informativa-section">
            <h2 className="important">Recuerda</h2>
            <p>
                Tu denuncia es completamente anónima. No se requerirá que reveles tu identidad ni ningún
                detalle personal. Si decides aportar pruebas, estas serán tratadas con la mayor privacidad
                posible.
            </p>
            </section>

            {/* Botón para continuar al formulario */}
            <button className="next-button" onClick={() => window.location.href = '/denuncia/formulario'}>
            Continuar con la denuncia
            </button>
        </main>
        <Footer />
        </div>
    </IonPage>
  );
};

export default InformativaDenuncia;
