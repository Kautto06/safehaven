import React, { useState } from "react";
import { IonPage, IonAlert, IonModal, IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import "../../assets/admin/AdminTestAutoevaluacion.css";

// Tipos de los datos
interface Opcion {
  id: number;
  texto: string;
}

interface Pregunta {
  id: number;
  pregunta: string;
  respuesta: string;
  opciones: Opcion[];
}

export const AdminTestAutoevaluacion: React.FC = () => {
  const history = useHistory();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([
    {
      id: 1,
      pregunta: "¿Sientes miedo o ansiedad en tu hogar?",
      respuesta: "",
      opciones: [
        { id: 1, texto: "Sí, frecuentemente" },
        { id: 2, texto: "A veces" },
        { id: 3, texto: "No, nunca" },
      ],
    },
    {
      id: 2,
      pregunta: "¿Has sido alguna vez humillado/a en público?",
      respuesta: "",
      opciones: [
        { id: 1, texto: "Sí, varias veces" },
        { id: 2, texto: "Sí, pero pocas veces" },
        { id: 3, texto: "No, nunca" },
      ],
    },
    {
      id: 3,
      pregunta: "¿Te han amenazado de alguna forma?",
      respuesta: "",
      opciones: [
        { id: 1, texto: "Sí, verbalmente" },
        { id: 2, texto: "Sí, físicamente" },
        { id: 3, texto: "No, nunca" },
      ],
    },
  ]);

  const [newPregunta, setNewPregunta] = useState<string>("");
  const [newOpcion, setNewOpcion] = useState<string>("");

  const [editPreguntaId, setEditPreguntaId] = useState<number | null>(null);
  const [editPreguntaText, setEditPreguntaText] = useState<string>("");

  const [editOpcionId, setEditOpcionId] = useState<number | null>(null);
  const [editOpcionText, setEditOpcionText] = useState<string>("");

  const [showOptionsModal, setShowOptionsModal] = useState<number | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [deletePreguntaId, setDeletePreguntaId] = useState<number | null>(null);
  const [deleteOpcionId, setDeleteOpcionId] = useState<number | null>(null);

  // Agregar pregunta
  const handleAgregarPregunta = () => {
    const newId = preguntas.length + 1;
    setPreguntas([...preguntas, { id: newId, pregunta: newPregunta, respuesta: "", opciones: [] }]);
    setNewPregunta("");
  };

  // Eliminar pregunta
  const handleEliminarPregunta = () => {
    if (deletePreguntaId !== null) {
      setPreguntas(preguntas.filter((pregunta) => pregunta.id !== deletePreguntaId));
      setDeletePreguntaId(null);
    }
    setShowConfirmDelete(false);
  };

  // Modificar pregunta
  const handleModificarPregunta = (id: number) => {
    setEditPreguntaId(id);
    const pregunta = preguntas.find((preg) => preg.id === id);
    if (pregunta) {
      setEditPreguntaText(pregunta.pregunta);
    }
  };

  const handleGuardarModificacion = () => {
    if (editPreguntaId !== null) {
      setPreguntas(
        preguntas.map((pregunta) =>
          pregunta.id === editPreguntaId ? { ...pregunta, pregunta: editPreguntaText } : pregunta
        )
      );
      setEditPreguntaId(null);
      setEditPreguntaText("");
    }
  };

  // Agregar opción
  const handleAgregarOpcion = (preguntaId: number) => {
    setPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              opciones: [...pregunta.opciones, { id: pregunta.opciones.length + 1, texto: newOpcion }],
            }
          : pregunta
      )
    );
    setNewOpcion("");
  };

  // Modificar opción
  const handleModificarOpcion = (preguntaId: number, opcionId: number) => {
    const preguntaIndex = preguntas.findIndex((pregunta) => pregunta.id === preguntaId);
    const opcion = preguntas[preguntaIndex].opciones.find((op) => op.id === opcionId);
    if (opcion) {
      setEditOpcionId(opcionId);
      setEditOpcionText(opcion.texto);
    }
  };

  const handleGuardarModificacionOpcion = (preguntaId: number) => {
    if (editOpcionId !== null) {
      setPreguntas(
        preguntas.map((pregunta) =>
          pregunta.id === preguntaId
            ? {
                ...pregunta,
                opciones: pregunta.opciones.map((opcion) =>
                  opcion.id === editOpcionId ? { ...opcion, texto: editOpcionText } : opcion
                ),
              }
            : pregunta
      ));
      setEditOpcionId(null);
      setEditOpcionText("");
      setShowOptionsModal(null); // Cerrar modal al guardar cambios
    }
  };

  // Eliminar opción
  const handleEliminarOpcion = (preguntaId: number, opcionId: number) => {
    setPreguntas(
      preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? { ...pregunta, opciones: pregunta.opciones.filter((opcion) => opcion.id !== opcionId) }
          : pregunta
      )
    );
    setDeleteOpcionId(null);
    setShowConfirmDelete(false);
  };

  const handleGoBack = () => {
    history.push("/admin");
  };

  return (
    <IonPage>
      <main className="admin-test-container">
        <header className="admin-header-test">
          <h1>Administración del Test de Autoevaluación</h1>
          <p className="header-description-test">
            El administrador puede agregar, modificar y eliminar preguntas del test de autoevaluación, así como gestionar
            las opciones de cada pregunta.
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
            className="input-question-new"
            placeholder="Nueva pregunta"
          />
          <button onClick={handleAgregarPregunta} className="add-question-button-new">
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
                <button onClick={() => handleModificarPregunta(pregunta.id)} className="edit-button">
                  Modificar
                </button>
                <button onClick={() => setShowOptionsModal(pregunta.id)} className="options-button">
                  Gestionar Opciones
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
                  <button onClick={handleGuardarModificacion} className="save-button-test">
                    Guardar
                  </button>
                  <button onClick={() => setEditPreguntaId(null)} className="cancel-button-test">
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal para opciones */}
        <IonModal isOpen={showOptionsModal !== null} onDidDismiss={() => setShowOptionsModal(null)}>
          <div className="options-modal-content">
            <h2>Gestionar Opciones</h2>
            {preguntas
              .find((pregunta) => pregunta.id === showOptionsModal)
              ?.opciones.map((opcion) => (
                <div key={opcion.id} className="option-item">
                  <span>{opcion.texto}</span>
                  <button onClick={() => handleModificarOpcion(showOptionsModal!, opcion.id)} className="edit-option">
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setDeleteOpcionId(opcion.id);
                      setShowConfirmDelete(true);
                    }}
                    className="delete-option"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            <div className="add-option">
              <input
                type="text"
                value={newOpcion}
                onChange={(e) => setNewOpcion(e.target.value)}
                placeholder="Nueva opción"
              />
              <button
                onClick={() => handleAgregarOpcion(showOptionsModal!)}
                className="add-option-button"
              >
                Agregar Opción
              </button>
            </div>
            {editOpcionId !== null && (
              <div className="edit-option-form-container">
                <div className="edit-option-form">
                  <input
                    type="text"
                    value={editOpcionText}
                    onChange={(e) => setEditOpcionText(e.target.value)}
                    className="input-option"
                  />
                  <button onClick={() => handleGuardarModificacionOpcion(showOptionsModal!)} className="save-option-button">
                    Guardar
                  </button>
                  <button onClick={() => setEditOpcionId(null)} className="cancel-option-button">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </IonModal>

        {/* Confirmar eliminación */}
        <IonAlert
          isOpen={showConfirmDelete}
          onDidDismiss={() => setShowConfirmDelete(false)}
          header="Confirmación"
          message="¿Está seguro de que desea eliminar esta opción?"
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              handler: () => setShowConfirmDelete(false),
            },
            {
              text: "Eliminar",
              handler: deleteOpcionId
                ? () => handleEliminarOpcion(showOptionsModal!, deleteOpcionId)
                : handleEliminarPregunta,
            },
          ]}
        />
      </main>
    </IonPage>
  );
};
