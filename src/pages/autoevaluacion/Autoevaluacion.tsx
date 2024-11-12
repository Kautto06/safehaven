import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonAlert } from '@ionic/react';
import '../../assets/autoevaluacion/Autoevaluacion.css';
import preguntasData from '../../data/preguntas.json';
import { Footer, Header } from '../../components';

export const Autoevaluacion: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]); // Estado para las preguntas
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({});
  const [submittedData, setSubmittedData] = useState<{ [key: string]: string } | null>(null);

  // Cargar preguntas desde el archivo importado
  useEffect(() => {
    // Usar los datos importados del archivo JSON
    const data = preguntasData;

    setQuestions(data.questions); // Establecer las preguntas desde el JSON

    // Inicializar formData con valores vacíos
    const initialData = data.questions.reduce((acc: any, question: any) => {
      acc[question.id] = '';
      return acc;
    }, {});

    setFormData(initialData);
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Limpiar error si se corrige el campo
    if (value !== '') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newErrorMessages: { [key: string]: string | null } = {};
    let allQuestionsAnswered = true;

    // Validación para cada pregunta
    questions.forEach((question) => {
      if (formData[question.id] === '') {
        newErrorMessages[question.id] = `Por favor responde la pregunta.`;                                                                                                                                                                                    
        allQuestionsAnswered = false;
      }
    });

    setErrorMessages(newErrorMessages);

    if (!allQuestionsAnswered) {
      return;
    }

    console.log('Form data: ', formData);
    setShowAlert(true); // Mostrar alerta de éxito
    setSubmittedData(formData); // Guardar los datos enviados para mostrar el JSON
  };

  const handleCancel = () => {
    const resetFormData = Object.keys(formData).reduce((acc: any, key: string) => {
      acc[key] = '';
      return acc;
    }, {});
    setFormData(resetFormData);
    setSubmittedData(null); // Limpiar los datos enviados
  };

  return (
    <IonPage>
      <Header /> {/* Usar el componente del header */}
      <IonContent className="evaluation-body">
        <main>
          <form onSubmit={handleSubmit} className='evaluation-form' id='evalutationForm'>
            <h1>Autoevaluación</h1>

            {questions.map((question) => (
              <div key={question.id} className='question'>
                <label className='question-label'>{question.label}</label>
                <select
                  className={`question-select ${errorMessages[question.id] ? 'error-highlight' : ''}`}
                  name={question.id}
                  value={formData[question.id]}
                  onChange={(e) => handleInputChange(question.id, e.target.value)} // Cambiar el evento de manera directa
                >
                  <option value="">Selecciona una opción</option>
                  {question.options.map((option: string, index: number) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>

                {errorMessages[question.id] && (
                  <p className="error-message">{errorMessages[question.id]}</p>
                )}
              </div>
            ))}

            <div className='comment-section'>
              <label>Comentario</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment || ''}
                onChange={(e) => handleInputChange('comment', e.target.value ?? '')} // Manejar null o undefined
                placeholder="Deja tu comentario aquí"
              />
            </div>

            <div className="buttons">
              <IonButton className="submit-button-evaluation" type="submit" expand="block">Enviar</IonButton>
              <IonButton className='cancel-button-evaluation' color="danger" expand="block" onClick={handleCancel} routerLink='/foro'>Cancelar</IonButton>
            </div>
          </form>

          {/* Mostrar datos enviados como JSON */}
          {submittedData && (
            <div className="submitted-data">
              <h2>Datos enviados:</h2>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}

          {/* Notificación de éxito */}
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={'Autoevaluación completada'}
            message={'La autoevaluación se realizó con éxito.'}
            buttons={['OK']}
          />
        </main>
      </IonContent>
      <Footer />
    </IonPage>
  );
};


