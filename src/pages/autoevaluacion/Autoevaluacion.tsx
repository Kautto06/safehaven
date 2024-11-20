import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonAlert,IonSpinner } from '@ionic/react';
import pageApi from '../../api/backend'; // Aquí importas la API de backend
import '../../assets/autoevaluacion/Autoevaluacion.css';
import { Footer, Header } from '../../components';
import { useAuthStore } from '../../hooks/auth/useAuthStore'; // Para obtener datos del usuario autenticado

export const Autoevaluacion: React.FC = () => {
  const { user,status } = useAuthStore(); // Usuario autenticado
  const [questions, setQuestions] = useState<any[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({});
  const [submittedData, setSubmittedData] = useState<{ [key: string]: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para evitar doble envío


  if (status !== 'authenticated' || !user || !('name' in user)) {
    return (
      <IonPage>
        <Header />
        <IonContent>
          <div className="loading-container">
            <IonSpinner name="bubbles" />
            <p>Cargando...</p>
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }


  // Cargar preguntas y opciones desde la API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await pageApi.get('/preguntas/preguntas-con-opciones'); // Usando pageApi.get
        console.log('Datos de preguntas:', response.data);
        setQuestions(response.data.questions);

        // Inicializar formData con valores vacíos
        const initialData = response.data.questions.reduce((acc: any, question: any) => {
          acc[question.id] = '';
          return acc;
        }, {});
        setFormData(initialData);
      } catch (error) {
        console.error("Error al obtener las preguntas con opciones:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (value !== '') {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newErrorMessages: { [key: string]: string | null } = {};
    let allQuestionsAnswered = true;

    // Validar respuestas
    questions.forEach((question) => {
      if (formData[question.id] === '') {
        newErrorMessages[question.id] = 'Por favor responde la pregunta.';
        allQuestionsAnswered = false;
      }
    });

    setErrorMessages(newErrorMessages);

    if (!allQuestionsAnswered || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Transformar datos para el backend
    const respuestas = questions.map((question) => ({
      idPregunta: question.id,
      idOpcion: formData[question.id]
    }));

    try {
      const response = await pageApi.post('/autoevaluacion/guardar', { 
        user: { email: user.email }, 
        respuestas 
      });

      console.log('Respuesta del backend:', response.data);
      setSubmittedData(formData); // Guardar datos enviados para mostrarlos
      setShowAlert(true); // Mostrar alerta de éxito
    } catch (error) {
      console.error('Error al enviar la autoevaluación:', error);
      alert('Ocurrió un error al enviar la autoevaluación. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="evaluation-body">
        <main>
          <form onSubmit={handleSubmit} className="evaluation-form">
            <h1>Autoevaluación</h1>
            {questions.map((question) => (
              <div key={question.id} className="question">
                <label className="question-label">{question.label}</label>
                <select
                  className={`question-select ${errorMessages[question.id] ? 'error-highlight' : ''}`}
                  name={question.id}
                  value={formData[question.id]}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {question.options.map((option: { id: string; option: string }) => (
                    <option key={option.id} value={option.id}>{option.option}</option>
                  ))}
                </select>

                {errorMessages[question.id] && (
                  <p className="error-message">{errorMessages[question.id]}</p>
                )}
              </div>
            ))}

            <div className="buttons">
              <IonButton className="submit-button-evaluation" type="submit" expand="block" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </IonButton>
              <IonButton className="cancel-button-evaluation" color="danger" expand="block" onClick={() => setSubmittedData(null)}>
                Cancelar
              </IonButton>
            </div>
          </form>

          {submittedData && (
            <div className="submitted-data">
              <h2>Datos enviados:</h2>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={'Autoevaluación completada'}
            message={'Nuestro personal se pondra en contacto contigo'}
            buttons={['OK']}
          />
        </main>
      </IonContent>
      <Footer />
    </IonPage>
  );
};
