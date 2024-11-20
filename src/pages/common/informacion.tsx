import { IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import '../../assets/common/informacion.css';
import { Footer, Header } from '../../components';

import prevencionImg from '../../assets/images/prevencion.jpg';
import recursosImg from '../../assets/images/recursos.png';

export const InformacionViolenciaGenero: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="info-section">
          <h2>Información sobre la Violencia de Género</h2>

          <div className="info-subsection">
            <h3>¿Qué es la Violencia de Género?</h3>
            <p>
              La violencia de género es un problema social grave que afecta a millones de personas en todo el mundo. Implica cualquier acto de violencia basado en el género de una persona, en su mayoría, hacia las mujeres, pero también puede afectar a personas de cualquier género.
            </p>
            <img src={prevencionImg} alt="Prevención de violencia de género" className="info-section-image" />
            <p>
              La violencia de género incluye conductas que tienen como objetivo dominar, controlar, humillar o dañar a una persona por el hecho de ser de un determinado género. Estas conductas pueden ser físicas, psicológicas, sexuales, económicas o de otro tipo.
            </p>
          </div>

          <div className="info-subsection">
            <h3>Tipos de Violencia de Género</h3>
            {[
              { id: 'fisica', title: 'Violencia física', content: 'Agresión física directa, como golpes, empujones o incluso homicidio.' },
              { id: 'psicologica', title: 'Violencia psicológica', content: 'Abuso emocional o mental, como insultos, amenazas o humillaciones.' },
              { id: 'sexual', title: 'Violencia sexual', content: 'Coacción o abuso sexual, incluyendo violación o acoso sexual.' },
              { id: 'economica', title: 'Violencia económica', content: 'Control de los recursos financieros, impidiendo la autonomía de la víctima.' },
              { id: 'simbolica', title: 'Violencia simbólica', content: 'Representaciones culturales y sociales que refuerzan la desigualdad y el abuso.' },
            ].map(({ id, title, content }) => (
              <div key={id} className="accordion-item">
                <div
                  className={`accordion-header ${activeAccordion === id ? 'active' : ''}`}
                  onClick={() => toggleAccordion(id)}
                >
                  {title}
                </div>
                <div
                  className={`accordion-body ${activeAccordion === id ? 'open' : ''}`}
                  style={{
                    maxHeight: activeAccordion === id ? '200px' : '0',
                    opacity: activeAccordion === id ? 1 : 0,
                  }}
                >
                  {content}
                </div>
              </div>
            ))}
          </div>


          <div className="info-subsection">
            <h3>¿Cómo Prevenirla?</h3>
            <p>
              La prevención de la violencia de género comienza con la educación y la sensibilización. Algunas acciones clave para prevenirla son:
            </p>
            <ul>
              <li>Fomentar la igualdad de género desde la infancia.</li>
              <li>Promover la educación en el respeto y la empatía.</li>
              <li>Denunciar cualquier tipo de violencia y apoyar a las víctimas.</li>
              <li>Apoyar políticas públicas que promuevan la equidad de género.</li>
            </ul>
          </div>
        </div>

        <div className="info-subsection">
            <h3>Recursos y Apoyo</h3>
            <div className="resources-section">
              <div className="resource-item">
                <h4>Centros de atención a víctimas</h4>
                <p>Centros especializados en apoyo psicológico y legal para las víctimas.</p>
                <a 
                    href="https://www.sernameg.gob.cl/?page_id=29" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link"
                    >
                         sernameg
                    </a>
              </div>
              <div className="resource-item">
                <h4>Líneas de emergencia</h4>
                <p>Números de teléfono para denunciar y recibir ayuda inmediata.</p>
                <p> 1445 Fono orientacion en violencia de genero - Gob De Chile</p>
              </div>
              <div className="resource-item">
                <h4>Asesoría legal</h4>
                <p>Abogados y profesionales que te orientarán sobre cómo proceder.</p>
                <a 
                    href="https://amldefensa.cl/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="resource-link"
                    >
                         amldefensa
                    </a>
              </div>
            </div>
            <img src={recursosImg} alt="Recursos de apoyo" className="info-section-image"/>
          </div>



        <Footer />
      </IonContent>
    </IonPage>
  );
};
