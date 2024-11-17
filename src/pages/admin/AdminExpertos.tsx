import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import '../../assets/admin/AdminExperts.css';
import { useHistory } from 'react-router';

export const AdminExperts: React.FC = () => {
  const history = useHistory()
  const [experts, setExperts] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      telefono: '123456789',
      email: 'john.doe@example.com',
      genero: 'Masculino',
      ocupacion: 'Psicólogo',
      imagen: 'default1.jpg',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      telefono: '987654321',
      email: 'jane.smith@example.com',
      genero: 'Femenino',
      ocupacion: 'Abogada',
      imagen: 'default2.jpg',
    },
  ]);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState<{ show: boolean; expert: any | null }>({ show: false, expert: null });
  const [showConfirmDelete, setShowConfirmDelete] = useState<{ show: boolean; expertId: number | null }>({ show: false, expertId: null });

  const [newExpert, setNewExpert] = useState<any>({
    firstName: '',
    lastName: '',
    telefono: '',
    email: '',
    genero: '',
    ocupacion: '',
    imagen: '',
  });

  const handleAddNewExpert = () => {
    setNewExpert({
      firstName: '',
      lastName: '',
      telefono: '',
      email: '',
      genero: '',
      ocupacion: '',
      imagen: '',
    });
    setShowAddPopup(true);
  };

  const handleSaveNewExpert = () => {
    const newId = experts.length > 0 ? Math.max(...experts.map((e) => e.id)) + 1 : 1;
    const updatedExperts = [...experts, { ...newExpert, id: newId }];
    setExperts(updatedExperts);
    setShowAddPopup(false);
  };

  const handleEditExpert = (expert: any) => {
    setShowEditPopup({ show: true, expert });
    setNewExpert({ ...expert });
  };

  const handleSaveEditExpert = () => {
    const updatedExperts = experts.map((e) => (e.id === newExpert.id ? { ...newExpert } : e));
    setExperts(updatedExperts);
    setShowEditPopup({ show: false, expert: null });
  };

  const handleConfirmDelete = (id: number) => {
    setShowConfirmDelete({ show: true, expertId: id });
  };

  const handleDeleteExpert = () => {
    const updatedExperts = experts.filter((e) => e.id !== showConfirmDelete.expertId);
    setExperts(updatedExperts);
    setShowConfirmDelete({ show: false, expertId: null });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewExpert({ ...newExpert, imagen: file.name });
    }
  };

  const handleGoBack = () => {
    history.push('/admin'); // Cambiar '/admin' por la ruta correspondiente
  };


  return (
    <IonPage>
      <div className="experts-admin-container">
        <header className="experts-admin-header">
          <h1>Administración de Expertos</h1>
          <div className="experts-admin-intro">
            <p>Gestione el directorio de expertos aquí. Puede agregar, editar o eliminar expertos según sea necesario.</p>
          </div>
        </header>

        <div className="back-button-container">
          <button className="back-button" onClick={handleGoBack}>
              Volver a la página principal
          </button>
        </div>
        


        <div className="experts-admin-list">
          {experts.map((expert) => (
            <div key={expert.id} className="experts-admin-card">
              <div className="experts-admin-image-wrapper">
                <img src={`/path/to/images/${expert.imagen}`} alt={expert.firstName} className="experts-admin-image" />
              </div>
              <div className="experts-admin-info">
                <h3>{`${expert.firstName} ${expert.lastName}`}</h3>
                <p>{expert.ocupacion}</p>
                <p><strong>Teléfono:</strong> {expert.telefono}</p>
                <p><strong>Email:</strong> {expert.email}</p>
              </div>
              <div className="experts-admin-actions">
                <button className="experts-admin-edit-button" onClick={() => handleEditExpert(expert)}>Editar</button>
                <button className="experts-admin-delete-button" onClick={() => handleConfirmDelete(expert.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        <button className="experts-admin-add-button" onClick={handleAddNewExpert}>
          Agregar Nuevo Experto
        </button>

        {showAddPopup && (
          <div className="experts-admin-overlay">
            <div className="experts-admin-add-popup">
              <h3>Agregar Nuevo Experto</h3>
              <form className="experts-admin-form">
                <input type="text" placeholder="Nombre" value={newExpert.firstName} onChange={(e) => setNewExpert({ ...newExpert, firstName: e.target.value })} />
                <input type="text" placeholder="Apellido" value={newExpert.lastName} onChange={(e) => setNewExpert({ ...newExpert, lastName: e.target.value })} />
                <input type="text" placeholder="Teléfono" value={newExpert.telefono} onChange={(e) => setNewExpert({ ...newExpert, telefono: e.target.value })} />
                <input type="email" placeholder="Email" value={newExpert.email} onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })} />
                <input type="text" placeholder="Género" value={newExpert.genero} onChange={(e) => setNewExpert({ ...newExpert, genero: e.target.value })} />
                <input type="text" placeholder="Ocupación" value={newExpert.ocupacion} onChange={(e) => setNewExpert({ ...newExpert, ocupacion: e.target.value })} />
                <input type="file" onChange={handleImageChange} />
              </form>
              <div className="experts-admin-form-buttons">
                <button className="experts-admin-submit-button" onClick={handleSaveNewExpert}>Guardar</button>
                <button className="experts-admin-cancel-button" onClick={() => setShowAddPopup(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {showEditPopup.show && (
          <div className="experts-admin-overlay">
            <div className="experts-admin-add-popup">
              <h3>Editar Experto</h3>
              <form className="experts-admin-form">
                <input type="text" placeholder="Nombre" value={newExpert.firstName} onChange={(e) => setNewExpert({ ...newExpert, firstName: e.target.value })} />
                <input type="text" placeholder="Apellido" value={newExpert.lastName} onChange={(e) => setNewExpert({ ...newExpert, lastName: e.target.value })} />
                <input type="text" placeholder="Teléfono" value={newExpert.telefono} onChange={(e) => setNewExpert({ ...newExpert, telefono: e.target.value })} />
                <input type="email" placeholder="Email" value={newExpert.email} onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })} />
                <input type="text" placeholder="Género" value={newExpert.genero} onChange={(e) => setNewExpert({ ...newExpert, genero: e.target.value })} />
                <input type="text" placeholder="Ocupación" value={newExpert.ocupacion} onChange={(e) => setNewExpert({ ...newExpert, ocupacion: e.target.value })} />
                <input type="file" onChange={handleImageChange} />
              </form>
              <div className="experts-admin-form-buttons">
                <button className="experts-admin-submit-button" onClick={handleSaveEditExpert}>Guardar</button>
                <button className="experts-admin-cancel-button" onClick={() => setShowEditPopup({ show: false, expert: null })}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {showConfirmDelete.show && (
          <div className="experts-admin-overlay">
            <div className="experts-admin-confirmation-popup">
              <p>¿Estás seguro de que deseas eliminar este experto?</p>
              <div className="experts-admin-form-buttons">
                <button className="experts-admin-submit-button" onClick={handleDeleteExpert}>Sí</button>
                <button className="experts-admin-cancel-button" onClick={() => setShowConfirmDelete({ show: false, expertId: null })}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </IonPage>
  );
};
