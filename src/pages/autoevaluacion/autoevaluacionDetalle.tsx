import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; 
import { Header, Footer } from '../../components';
import pageApi from '../../api/backend'; 
import '../../assets/autoevaluacion/detalleaut.css'

interface Respuesta {
  id_pregunta: number;
  texto_pregunta: string;
  id_opcion: number;
  texto_opcion: string;
}

interface Pregunta {
  ID: number;
  Pregunta: string;
}

export const ResultadosAutoevaluacion: React.FC = () => {
  const { id_objeto } = useParams<{ id_objeto: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const history = useHistory();

  useEffect(() => {
    const obtenerResultados = async () => {
      try {
        setLoading(true);
        const respuestasResponse = await pageApi.get(`/autoevaluacion/resultado/${id_objeto}`);
        setRespuestas(respuestasResponse.data);

        const preguntasResponse = await pageApi.get(`/preguntas/obtener`);
        setPreguntas(preguntasResponse.data);
      } catch (error) {
        console.error('Error al obtener los resultados de la autoevaluación:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerResultados();
  }, [id_objeto]);

  const preguntasRespondidas = preguntas.filter((pregunta) =>
    respuestas.some((respuesta) => respuesta.id_pregunta === pregunta.ID)
  );

  return (
    <div className="autdetalle-page">
      <Header />

      {/* Contenedor principal */}
      <div className="autdetalle-container">
        <div className="autdetalle-resultados-body">
          <section className="autdetalle-resultados-section">
            <h1 className="autdetalle-heading">Respuestas de la Autoevaluación</h1>
            <button
              className="autdetalle-volver-resultados"
              onClick={() => history.push('/actividades')} 
            >
              Volver a Actividades
            </button>
            {loading ? (
              <div className="autdetalle-loading-container">
                <div className="autdetalle-spinner"></div>
                <p className="autdetalle-loading-text">Cargando resultados...</p>
              </div>
            ) : preguntasRespondidas.length > 0 ? (
              <div className="autdetalle-list">
                {preguntasRespondidas.map((pregunta) => {
                  const respuesta = respuestas.find(
                    (resp) => resp.id_pregunta === pregunta.ID
                  );

                  return (
                    <div key={pregunta.ID} className="autdetalle-card">
                      <div className="autdetalle-card-header">
                        <h2 className="autdetalle-card-title">{pregunta.Pregunta}</h2>
                      </div>
                      <div className="autdetalle-card-content">
                        {respuesta ? (
                          <div className="autdetalle-list-item">
                            <strong className="autdetalle-label">Opción seleccionada:</strong> {respuesta.texto_opcion}
                          </div>
                        ) : (
                          <p className="autdetalle-no-respuesta">No se encontró respuesta para esta pregunta.</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="autdetalle-no-respuestas">No se encontraron respuestas para esta autoevaluación.</p>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};
