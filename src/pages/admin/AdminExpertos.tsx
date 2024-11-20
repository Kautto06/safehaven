import React, { useState, useEffect } from 'react';
import { IonPage } from '@ionic/react';
import '../../assets/admin/AdminExperts.css';
import { useHistory } from 'react-router';
import { getExpertos, agregarExperto, modificarExperto, eliminarExperto, subirImagenExperto, getExpertoPorId } from './services/expertos';

interface IExpert {
  ID: number;
  First_Name: string;
  Last_Name: string;
  Telefono: string;
  Email: string;
  Genero: string;
  Ocupación: string;
  descripcion: string;
  Fecha_Nacimiento: string;
  Direccion: string;
  Certificaciones: string;
  Modalidad_Atencion: string;
  About_Me: string;
  LinkImagen: string;
}

export const AdminExperts: React.FC = () => {
  const history = useHistory();
  const [imagenArchivo, setImagenArchivo] = useState<File | null>(null);
  const [experts, setExperts] = useState<IExpert[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [newExpert, setNewExpert] = useState<IExpert>({
    ID: 0,
    First_Name: '',
    Last_Name: '',
    Telefono: '',
    Email: '',
    Genero: '',
    Ocupación: '',
    descripcion: '',
    Fecha_Nacimiento: '',
    Direccion: '',
    Certificaciones: '',
    Modalidad_Atencion: '',
    About_Me: '',
    LinkImagen: '',
  });

  // Función para cargar los expertos desde el backend
  const loadExperts = async () => {
    try {
      const data = await getExpertos();
      setExperts(data);
    } catch (error) {
      console.error('Error fetching experts:', error);
    }
  };

  useEffect(() => {
    loadExperts();
  }, []);

  const handleAddNewExpert = () => {
    setNewExpert({
      ID: 0,
      First_Name: '',
      Last_Name: '',
      Telefono: '',
      Email: '',
      Genero: '',
      Ocupación: '',
      descripcion: '',
      Fecha_Nacimiento: '',
      Direccion: '',
      Certificaciones: '',
      Modalidad_Atencion: '',
      About_Me: '',
      LinkImagen: '',
    });
    setShowAddPopup(true);
  };
  const handleSaveNewExpert = async () => {
    const { First_Name, Last_Name, Telefono, Email, Genero, Ocupación, Fecha_Nacimiento, Direccion } = newExpert;
    newExpert.LinkImagen = ''
    if (!First_Name || !Last_Name || !Telefono || !Email || !Genero || !Ocupación || !Fecha_Nacimiento || !Direccion) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      let expert = await agregarExperto(newExpert);

      let imagenUrl = '';
      if (imagenArchivo) {
        // Subir la imagen y obtener la URL
        imagenUrl = await subirImagenExperto(newExpert.ID, imagenArchivo);
      }

      expert = await getExpertoPorId(newExpert.ID)

      setExperts([...experts, expert]);
      setShowAddPopup(false);
    } catch (error) {
      console.error('Error adding expert:', error);
    }
  };

  const handleEditExpert = (expert: IExpert) => {
    setShowEditPopup(true);
    setNewExpert({ ...expert });
    
  };
  

  const handleSaveEditExpert = async () => {
    const { First_Name, Last_Name, Telefono, Email, Genero, Ocupación, Fecha_Nacimiento, Direccion } = newExpert;
    if (!First_Name || !Last_Name || !Telefono || !Email || !Genero || !Ocupación || !Fecha_Nacimiento || !Direccion) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      let updatedExpert = await modificarExperto(newExpert.ID, newExpert);
      

      let imagenUrl = newExpert.LinkImagen; // Mantener la URL existente si no se cambia
      if (imagenArchivo) {
        // Subir la imagen y obtener la URL
        imagenUrl = await subirImagenExperto(newExpert.ID, imagenArchivo);
      }

      updatedExpert = await getExpertoPorId(newExpert.ID)

      const updatedExperts = experts.map((e) => (e.ID === updatedExpert.ID ? updatedExpert : e));
      setExperts(updatedExperts);
      setShowEditPopup(false);
    } catch (error) {
      console.error('Error updating expert:', error);
    }
  };

  const handleConfirmDelete = (id: number) => {
    setShowConfirmDelete(true);
    setNewExpert({...newExpert,ID: id})
  };

  const handleDeleteExpert = async (id: number) => {
    try {
      if (id !== null) {
        await eliminarExperto(id);
        setExperts(experts.filter((e) => e.ID !== id));
        setShowConfirmDelete(false);
      }
    } catch (error) {
      console.error('Error deleting expert:', error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagenArchivo(file);
    }
  };

  const handleGoBack = () => {
    history.push('/admin'); // Ajustar la ruta según tu aplicación
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

        <div className="back-button-container-admin">
          <button className="back-button-admin" onClick={handleGoBack}>
            Volver a la página principal
          </button>
        </div>

        <div className="experts-admin-list">
          {experts.map((expert) => (
            <div key={expert.ID} className="experts-admin-card">
              <div className="experts-admin-image-wrapper">
                <img src={expert.LinkImagen} alt={expert.First_Name} className="experts-admin-image" />
              </div>
              <div className="experts-admin-info">
                <h3>{`${expert.First_Name} ${expert.Last_Name}`}</h3>
                <p><strong>Ocupación:</strong> {expert.Ocupación}</p>
                <p><strong>Teléfono:</strong> {expert.Telefono}</p>
                <p><strong>Email:</strong> {expert.Email}</p>
                <p><strong>Género:</strong> {expert.Genero}</p>
                <p><strong>Fecha de Nacimiento:</strong> {expert.Fecha_Nacimiento}</p>
                <p><strong>Dirección:</strong> {expert.Direccion}</p>
                <p><strong>Certificaciones:</strong> {expert.Certificaciones}</p>
                <p><strong>Modalidad de Atención:</strong> {expert.Modalidad_Atencion}</p>
                <p><strong>Descripción:</strong> {expert.descripcion}</p>
                <p><strong>Sobre mí:</strong> {expert.About_Me}</p>
              </div>
              <div className="experts-admin-actions">
                <button className="experts-admin-edit-button" onClick={() => handleEditExpert(expert)}>Editar</button>
                <button
                  className="experts-admin-delete-button"
                  onClick={() => handleConfirmDelete(expert.ID)}
                >
                  Eliminar
                </button>
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
              <h3>Nuevo Experto</h3>
              <form className='experts-admin-form'>
                <input type="text" placeholder="Nombre" value={newExpert.First_Name} onChange={(e) => setNewExpert({ ...newExpert, First_Name: e.target.value })} />
                <input type="text" placeholder="Apellido" value={newExpert.Last_Name} onChange={(e) => setNewExpert({ ...newExpert, Last_Name: e.target.value })} />
                <input type="text" placeholder="Teléfono" value={newExpert.Telefono} onChange={(e) => setNewExpert({ ...newExpert, Telefono: e.target.value })} />
                <input type="email" placeholder="Email" value={newExpert.Email} onChange={(e) => setNewExpert({ ...newExpert, Email: e.target.value })} />
                <input type="text" placeholder="Género" value={newExpert.Genero} onChange={(e) => setNewExpert({ ...newExpert, Genero: e.target.value })} />
                <input type="text" placeholder="Ocupación" value={newExpert.Ocupación} onChange={(e) => setNewExpert({ ...newExpert, Ocupación: e.target.value })} />
                <input type="date" placeholder="Fecha de Nacimiento" value={newExpert.Fecha_Nacimiento} onChange={(e) => setNewExpert({ ...newExpert, Fecha_Nacimiento: e.target.value })} />
                <input type="text" placeholder="Dirección" value={newExpert.Direccion} onChange={(e) => setNewExpert({ ...newExpert, Direccion: e.target.value })} />
                <input type="text" placeholder="Certificaciones" value={newExpert.Certificaciones} onChange={(e) => setNewExpert({ ...newExpert, Certificaciones: e.target.value })} />
                <input type="text"placeholder="Modalidad de Atención"value={newExpert.Modalidad_Atencion}onChange={(e) => setNewExpert({ ...newExpert, Modalidad_Atencion: e.target.value })}/>
                <textarea placeholder="Descripción" value={newExpert.descripcion} onChange={(e) => setNewExpert({ ...newExpert, descripcion: e.target.value })}></textarea>
                <textarea placeholder="Sobre mí" value={newExpert.About_Me} onChange={(e) => setNewExpert({ ...newExpert, About_Me: e.target.value })}></textarea>
                <input type="file" onChange={handleImageChange} />
              </form>
              <div className="experts-admin-form-buttons">
                <button className="experts-admin-submit-button" onClick={handleSaveNewExpert}>Guardar</button>
                <button className="experts-admin-cancel-button" onClick={() => setShowAddPopup(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {showEditPopup && (
          <div className="experts-admin-overlay">
            <div className="experts-admin-add-popup">
              <h3>Editar Experto</h3>
              <form className="experts-admin-form">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newExpert.First_Name}
                  onChange={(e) => setNewExpert({ ...newExpert, First_Name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={newExpert.Last_Name}
                  onChange={(e) => setNewExpert({ ...newExpert, Last_Name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={newExpert.Telefono}
                  onChange={(e) => setNewExpert({ ...newExpert, Telefono: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newExpert.Email}
                  onChange={(e) => setNewExpert({ ...newExpert, Email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Género"
                  value={newExpert.Genero}
                  onChange={(e) => setNewExpert({ ...newExpert, Genero: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Ocupación"
                  value={newExpert.Ocupación}
                  onChange={(e) => setNewExpert({ ...newExpert, Ocupación: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Fecha de Nacimiento"
                  value={newExpert.Fecha_Nacimiento}
                  onChange={(e) => setNewExpert({ ...newExpert, Fecha_Nacimiento: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Dirección"
                  value={newExpert.Direccion}
                  onChange={(e) => setNewExpert({ ...newExpert, Direccion: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Certificaciones"
                  value={newExpert.Certificaciones}
                  onChange={(e) => setNewExpert({ ...newExpert, Certificaciones: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Modalidad de Atención"
                  value={newExpert.Modalidad_Atencion}
                  onChange={(e) => setNewExpert({ ...newExpert, Modalidad_Atencion: e.target.value })}
                />
                <textarea
                  placeholder="Descripción"
                  value={newExpert.descripcion}
                  onChange={(e) => setNewExpert({ ...newExpert, descripcion: e.target.value })}
                ></textarea>
                <textarea
                  placeholder="Sobre mí"
                  value={newExpert.About_Me}
                  onChange={(e) => setNewExpert({ ...newExpert, About_Me: e.target.value })}
                ></textarea>
                <input type="file" onChange={handleImageChange} />
              </form>

              <div className="experts-admin-edit-popup-actions">
                <button className="experts-admin-submit-button" onClick={handleSaveEditExpert}>Guardar</button>
                <button className="experts-admin-cancel-button" onClick={() => setShowEditPopup(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {showConfirmDelete&& (
          <div className="experts-admin-overlay">
            <div className="experts-admin-confirmation-popup">
              <p>¿Estás seguro de que quieres eliminar este experto?</p>
              <div className="experts-admin-form-buttons">
                <button className="experts-admin-submit-button"  onClick={(e) =>handleDeleteExpert(newExpert.ID)}>Sí, eliminar</button>
                <button className="experts-admin-cancel-button" onClick={() => setShowConfirmDelete(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </IonPage>
  );
};
