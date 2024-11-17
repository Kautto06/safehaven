import React, { useState } from 'react';
import { IonPage, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router';

import '../../assets/admin/AdminTestAutoevaluacion.css'

// Definir el tipo de los datos que manejamos
interface Pregunta {
  id: number;
  pregunta: string;
  respuesta: string;
}

export const AdminTestAutoevaluacion: React.FC = () => {
  const history = useHistory();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([
    { id: 1, pregunta: "¿Sientes miedo o ansiedad en tu hogar?", respuesta: "" },
    { id: 2, pregunta: "¿Has sido alguna vez humillado/a en público?", respuesta: "" },
    { id: 3, pregunta: "¿Te han amenazado de alguna forma?", respuesta: "" },
  ]);
  const [newPregunta, setNewPregunta] = useState<string>("");

  const [editPreguntaId, setEditPreguntaId] = useState<number | null>(null);
  const [editPreguntaText, setEditPreguntaText] = useState<string>("");

  // Estado para mostrar el alert de confirmación de eliminación
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [deletePreguntaId, setDeletePreguntaId] = useState<number | null>(null);

  // Función para agregar una nueva pregunta
  const handleAgregarPregunta = () => {
    const newId = preguntas.length + 1;
    setPreguntas([...preguntas, { id: newId, pregunta: newPregunta, respuesta: "" }]);
    setNewPregunta(""); // Limpiar el campo de texto
  };

  // Función para eliminar una pregunta
  const handleEliminarPregunta = () => {
    if (deletePreguntaId !== null) {
      setPreguntas(preguntas.filter(pregunta => pregunta.id !== deletePreguntaId));
      setDeletePreguntaId(null); // Limpiar el id después de la eliminación
    }
    setShowConfirmDelete(false); // Cerrar el modal
  };

  // Función para modificar una pregunta
  const handleModificarPregunta = (id: number) => {
    setEditPreguntaId(id);
    const pregunta = preguntas.find(preg => preg.id === id);
    if (pregunta) {
      setEditPreguntaText(pregunta.pregunta);
    }
  };

  const handleGuardarModificacion = () => {
    if (editPreguntaId !== null) {
      setPreguntas(preguntas.map(pregunta =>
        pregunta.id === editPreguntaId ? { ...pregunta, pregunta: editPreguntaText } : pregunta
      ));
      setEditPreguntaId(null); // Limpiar el id después de la modificación
      setEditPreguntaText(""); // Limpiar el texto de la pregunta
    }
  };

  // Función para redirigir a la página principal de administración
  const handleGoBack = () => {
    history.push('/admin'); // Cambiar '/admin' por la ruta correspondiente
  };

  return (
    <IonPage>
      

      <main className="admin-test-container">

        <header className="admin-header-test">
            <h1>Administración del Test de Autoevaluación</h1>
            <p className="header-description-test">
                El administrador puede agregar, modificar y eliminar preguntas del test de autoevaluación, así como ver las estadísticas agregadas.
            </p>
        </header>
        

        <div className="back-button-container">
          <button className="back-button" onClick={handleGoBack}>
              Volver a la página principal
          </button>
        </div>
        <div className="add-question-form">
          <input
            type="text"
            value={newPregunta}
            onChange={(e) => setNewPregunta(e.target.value)}
            className="input-question"
            placeholder="Nueva pregunta"
          />
          <button onClick={handleAgregarPregunta} className="add-question-button">
            Agregar Pregunta
          </button>
        </div>

        <div className="question-list">
          <h2>Preguntas del Test</h2>
          {preguntas.map((pregunta) => (
            <div key={pregunta.id} className="question-card">
              <div className="question-card-header">
                <h3>{pregunta.pregunta}</h3>
              </div>
              <div className="question-card-actions">
                <button
                  onClick={() => {
                    setDeletePreguntaId(pregunta.id);
                    setShowConfirmDelete(true);
                  }}
                  className="delete-button"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleModificarPregunta(pregunta.id)}
                  className="edit-button"
                >
                  Modificar
                </button>
              </div>

              {editPreguntaId === pregunta.id && (
                <div className="edit-question-form">
                  <input
                    type="text"
                    value={editPreguntaText}
                    onChange={(e) => setEditPreguntaText(e.target.value)}
                    className="input-question"
                  />
                  <button onClick={handleGuardarModificacion} className="save-button">
                    Guardar
                  </button>
                  <button onClick={() => setEditPreguntaId(null)} className="cancel-button">
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="statistics">
          <h2>Estadísticas del Test</h2>
          <p>Estadísticas agregadas sobre las respuestas del test se mostrarán aquí.</p>
          {/* Aquí puedes agregar un gráfico o tablas con estadísticas */}
        </div>

        {/* Modal de confirmación para eliminar una pregunta */}
        <IonAlert
          isOpen={showConfirmDelete}
          onDidDismiss={() => setShowConfirmDelete(false)}
          header="¿Estás seguro?"
          message="¿Deseas eliminar esta pregunta?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setShowConfirmDelete(false)
            },
            {
              text: 'Eliminar',
              handler: handleEliminarPregunta
            }
          ]}
        />
      </main>
    </IonPage>
  );
};
