import React, { useState, useEffect } from "react";
import { IonPage, IonAlert, IonButton, IonModal } from "@ionic/react";
import { useHistory } from "react-router";
import "../../assets/admin/AdminTestAutoevaluacion.css";
import { getPreguntas, getOpciones, agregarPregunta, eliminarPregunta, modificarPregunta, agregarOpcion, eliminarOpcion, modificarOpcion, getOpcionPorId, getPreguntaPorId } from "./services/autoEvaluacion"; // Importa las funciones

// Nuevas interfaces
interface Opcion {
  ID: number;
  Opcion: string;
  ID_Pregunta: number;
  frecuencia: number;
}

interface Pregunta {
  ID: number;
  Pregunta: string;
  opciones: Opcion[];
}

export const AdminTestAutoevaluacion: React.FC = () => {
  const history = useHistory();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
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

  const [showModalGestionarOpciones, setShowModalGestionarOpciones] = useState<boolean>(false);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState<Pregunta | null>(null);

  // Cargar preguntas y opciones desde la API
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [preguntasData, opcionesData] = await Promise.all([
          getPreguntas(), // Carga preguntas
          getOpciones(),  // Carga opciones
        ]);

        const preguntasConOpciones = preguntasData.map((pregunta: Pregunta) => ({
          ...pregunta,
          opciones: opcionesData.filter((opcion: Opcion) => opcion.ID_Pregunta === pregunta.ID) || [],
        }));

        setPreguntas(preguntasConOpciones);
      } catch (error) {
        console.error("Error al cargar las preguntas u opciones:", error);
      }
    };
    fetchDatos();
  }, []);

  // Agregar pregunta
  const handleAgregarPregunta = async () => {
    try {
      let nuevaPregunta = await agregarPregunta(newPregunta); // Llama al servicio para agregar la pregunta
      console.log(nuevaPregunta)
      nuevaPregunta = await getPreguntaPorId(nuevaPregunta.PreguntaID)
      console.log(nuevaPregunta)
      setPreguntas([...preguntas, { ...nuevaPregunta[0], opciones: [] }]); // Agrega la pregunta con un array vacío de opciones
      setNewPregunta(""); // Limpia el input
    } catch (error) {
      console.error("Error al agregar la pregunta:", error);
    }
  };

  // Eliminar pregunta
  const handleEliminarPregunta = async () => {
    if (deletePreguntaId !== null) {
      try {
        await eliminarPregunta(deletePreguntaId);
        setPreguntas(preguntas.filter((pregunta) => pregunta.ID !== deletePreguntaId));
        setDeletePreguntaId(null);
      } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
      }
    }
    setShowConfirmDelete(false);
  };

  // Modificar pregunta
  const handleModificarPregunta = (id: number) => {
    setEditPreguntaId(id);
    const pregunta = preguntas.find((preg) => preg.ID === id);

    if (pregunta) {
      setEditPreguntaText(pregunta.Pregunta);
    }
  };

  const handleGuardarModificacion = async () => {
    if (editPreguntaId !== null) {
      try {
        let updatedPregunta = await modificarPregunta(editPreguntaId, editPreguntaText); // Llama al servicio
        updatedPregunta = await getPreguntaPorId(editPreguntaId)
        console.log(updatedPregunta)
        setPreguntas(
          preguntas.map((pregunta) =>
            pregunta.ID === editPreguntaId
              ? { ...pregunta, Pregunta: updatedPregunta[0].Pregunta } // Actualiza el texto
              : pregunta
          )
        );
        setEditPreguntaId(null); // Limpia la edición
        setEditPreguntaText("");
      } catch (error) {
        console.error("Error al modificar la pregunta:", error);
      }
    }
  };

  // Agregar opción
  const handleAgregarOpcion = async (preguntaId: number) => {
    try {
      let nuevaOpcion = await agregarOpcion(preguntaId, newOpcion); // Llama al servicio
      nuevaOpcion = await getOpcionPorId(nuevaOpcion.OpcionID)
      setPreguntas(
        preguntas.map((pregunta) =>
          pregunta.ID === preguntaId
            ? { ...pregunta, opciones: [...pregunta.opciones, nuevaOpcion[0]] } // Agrega la nueva opción
            : pregunta
        )
      );
      setNewOpcion(""); // Limpia el input
    } catch (error) {
      console.error("Error al agregar la opción:", error);
    }
  };

  // Eliminar opción
  const handleEliminarOpcion = async (preguntaId: number, opcionId: number) => {
    try {
      await eliminarOpcion(preguntaId, opcionId);
      setPreguntas(
        preguntas.map((pregunta) =>
          pregunta.ID === preguntaId
            ? { ...pregunta, opciones: pregunta.opciones.filter((opcion) => opcion.ID !== opcionId) }
            : pregunta
        )
      );
    } catch (error) {
      console.error("Error al eliminar la opción:", error);
    }
  };

  // Modificar opción
  const handleModificarOpcion = (preguntaId: number, opcionId: number) => {
    const pregunta = preguntas.find((preg) => preg.ID === preguntaId);
    if (pregunta) {
      const opcion = pregunta.opciones.find((op) => op.ID === opcionId);
      if (opcion) {
        setEditOpcionId(opcionId);
        setEditOpcionText(opcion.Opcion);
      }
    }
    
  };

  const handleGuardarModificacionOpcion = async (preguntaId: number) => {
    if (editOpcionId !== null) {
      try {
        let updatedOpcion = await modificarOpcion(preguntaId, editOpcionId, editOpcionText); // Llama al servicio
        updatedOpcion = await getOpcionPorId(editOpcionId)
        setPreguntas(
          preguntas.map((pregunta) =>
            pregunta.ID === preguntaId
              ? {
                  ...pregunta,
                  opciones: pregunta.opciones.map((opcion) =>
                    opcion.ID === editOpcionId
                      ? { ...opcion, Opcion: updatedOpcion[0].Opcion } // Actualiza el texto
                      : opcion
                  ),
                }
              : pregunta
          )
        );
        setEditOpcionId(null); // Limpia la edición
        setEditOpcionText("");
      } catch (error) {
        console.error("Error al modificar la opción:", error);
      }
    }
  };

  // Gestión de opciones
  const handleGestionarOpciones = (pregunta: Pregunta) => {
    setPreguntaSeleccionada(pregunta);
    setShowModalGestionarOpciones(true);
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
            Agrega, modifica y elimina preguntas y opciones del test.
          </p>
        </header>

        <div className="back-button-container-admin">
          <button onClick={() => (window.location.href = "/admin")} className="back-button-admin">
            Volver a la página principal
          </button>
        </div>

        <div className="add-question-form">
          <input
            type="text"
            value={newPregunta}
            onChange={(e) => setNewPregunta(e.target.value)}
            placeholder="Nueva pregunta"
            className="input-question-new"
          />
          <button onClick={handleAgregarPregunta} className="add-question-button-new">
            Agregar Pregunta
          </button>
        </div>

        <section className="question-list">
          <h2>Preguntas</h2>
          {preguntas.map((pregunta) => (
            <article key={pregunta.ID} className="question-card">
              <header className="question-card-header">
                {editPreguntaId === pregunta.ID ? (
                  <div className="edit-input-container">
                    <input
                      type="text"
                      value={editPreguntaText}
                      onChange={(e) => setEditPreguntaText(e.target.value)}
                      placeholder="Editar pregunta"
                      className="input-edit"
                    />
                    <button onClick={handleGuardarModificacion} className="save-button">
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setEditPreguntaId(null);
                        setEditPreguntaText("");
                      }}
                      className="cancel-button"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <h3>{pregunta.Pregunta}</h3>
                )}
              </header>
              <div className="question-card-actions">
                <button
                  onClick={() => {
                    setDeletePreguntaId(pregunta.ID);
                    setShowConfirmDelete(true);
                  }}
                  className="delete-button"
                >
                  Eliminar
                </button>
                <button onClick={() => setShowOptionsModal(pregunta.ID)} className="options-button">
                  Gestionar Opciones
                </button>
                <button onClick={() => handleModificarPregunta(pregunta.ID)} className="edit-button">
                  Modificar
                </button>
              </div>
            </article>
          ))}
        </section>

        <IonModal isOpen={showOptionsModal !== null} onDidDismiss={() => setShowOptionsModal(null)}>
          <section className="options-modal-content">
            <h2>Gestionar Opciones</h2>
            {preguntas
              .find((pregunta) => pregunta.ID === showOptionsModal)
              ?.opciones.map((opcion) => (
                <div key={opcion.ID} className="option-item">
                  {editOpcionId === opcion.ID ? (
                    <div className="edit-input-container">
                      <input
                        type="text"
                        value={editOpcionText}
                        onChange={(e) => setEditOpcionText(e.target.value)}
                        placeholder="Editar opción"
                        className="input-edit"
                      />
                      <button
                        onClick={() => handleGuardarModificacionOpcion(showOptionsModal!)}
                        className="save-button"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => {
                          setEditOpcionId(null);
                          setEditOpcionText("");
                        }}
                        className="cancel-button"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>{opcion.Opcion}</span>
                      <button
                        onClick={() => handleModificarOpcion(showOptionsModal!, opcion.ID)}
                        className="edit-option-button"
                      >
                        Modificar
                      </button>
                      <button
                        onClick={() => handleEliminarOpcion(showOptionsModal!, opcion.ID)}
                        className="delete-option"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              ))}
            <div className="add-option">
              <input
                type="text"
                value={newOpcion}
                onChange={(e) => setNewOpcion(e.target.value)}
                placeholder="Nueva opción"
              />
              <button onClick={() => handleAgregarOpcion(showOptionsModal!)} className="add-option-button">
                Agregar Opción
              </button>
            </div>
          </section>
        </IonModal>

        <IonAlert
          isOpen={showConfirmDelete}
          onDidDismiss={() => setShowConfirmDelete(false)}
          header="Confirmación"
          message="¿Está seguro de que desea eliminar?"
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
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
