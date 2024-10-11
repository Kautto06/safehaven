import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonAlert } from '@ionic/react';
import Header from '../components/Header'; // Importar el header
import Footer from '../components/Footer';
import '../assets/Autoevaluacion.css';

const Autoevaluacion: React.FC = () => {
  const questions = [
    { id: 'question1', label: 'Pregunta 1' },
    { id: 'question2', label: 'Pregunta 2' },
    { id: 'question3', label: 'Pregunta 3' },
    { id: 'question4', label: 'Pregunta 4' }
  ];

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    comment: ''
  });

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    comment: null
  });
  const [submittedData, setSubmittedData] = useState<{ [key: string]: string } | null>(null);

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
        newErrorMessages[question.id] = `Por favor responde la ${question.label}.`;
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
    setFormData({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      comment: ''
    });
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
                  <option value="option1">Opción 1</option>
                  <option value="option2">Opción 2</option>
                  <option value="option3">Opción 3</option>
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
                value={formData.comment}
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

export default Autoevaluacion;
