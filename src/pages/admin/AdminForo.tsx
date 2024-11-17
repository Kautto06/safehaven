import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router';

import '../../assets/admin/AdminForo.css';

export const AdminForo: React.FC = () => {
  const history = useHistory();

  const [posts, setPosts] = useState([
    { id: 1, usuario: 'Usuario1', contenido: 'Estoy pasando por un momento difícil, me siento atrapado/a...', fecha: '2024-11-16' },
    { id: 2, usuario: 'Usuario2', contenido: 'No estoy seguro/a cómo manejar la situación en mi casa...', fecha: '2024-11-15' },
    { id: 3, usuario: 'Usuario3', contenido: 'Gracias a este foro, me siento más apoyado/a', fecha: '2024-11-14' }
  ]);

  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; postId: number | null }>({ show: false, postId: null });
  const [confirmBlock, setConfirmBlock] = useState<{ show: boolean; usuario: string | null }>({ show: false, usuario: null });
  const [blockMessage, setBlockMessage] = useState<string | null>(null); // Mensaje de confirmación de bloqueo

  // Función para confirmar la eliminación
  const handleConfirmDelete = (id: number) => {
    setConfirmDelete({ show: true, postId: id });
  };

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setConfirmDelete({ show: false, postId: null });
  };

  // Función para eliminar el post
  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    setConfirmDelete({ show: false, postId: null });
  };

  // Función para confirmar el bloqueo
  const handleConfirmBlock = (usuario: string) => {
    setConfirmBlock({ show: true, usuario });
  };

  // Función para cancelar el bloqueo
  const handleCancelBlock = () => {
    setConfirmBlock({ show: false, usuario: null });
  };

  // Función para bloquear al usuario y mostrar mensaje
  const handleBlockUser = (usuario: string) => {
    setBlockMessage(`El usuario ${usuario} ha sido bloqueado.`); // Mostrar mensaje de confirmación
    setConfirmBlock({ show: false, usuario: null });

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setBlockMessage(null);
    }, 3000);
  };

  const handleGoBack = () => {
    history.push('/admin'); // Cambia '/admin' por la ruta correspondiente a tu página principal de administración
  };

  return (
    <IonPage>
      <main className="foro-admin-container">
        <header className="foro-admin-header">
            <h1>Administración del Foro de Apoyo</h1>
            <p className="foro-admin-description">
                El administrador puede moderar el foro para garantizar un entorno seguro. Esto incluye eliminar publicaciones inapropiadas y bloquear usuarios.
            </p>
        </header>

        <div className="back-button-container">
            <button className="back-button" onClick={handleGoBack}>
            Volver a la página principal
            </button>
        </div>

        <section className="foro-admin-post-list">
          <h2>Mensajes del Foro</h2>
          {posts.map((post) => (
            <div key={post.id} className="foro-admin-post-card">
              <div className="foro-admin-post-header">
                <strong>{post.usuario}</strong> - <span>{post.fecha}</span>
              </div>
              <div className="foro-admin-post-content">
                <p>{post.contenido}</p>
              </div>
              <div className="foro-admin-post-actions">
                <button className="foro-admin-moderate-button" onClick={() => handleConfirmDelete(post.id)}>
                  Eliminar
                </button>
                <button className="foro-admin-moderate-button" onClick={() => handleConfirmBlock(post.usuario)}>
                  Bloquear Usuario
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Mensaje de confirmación de bloqueo */}
        {blockMessage && (
          <div className="foro-admin-block-message">
            <p>{blockMessage}</p>
          </div>
        )}

        {/* Pop-up de confirmación para eliminar publicación */}
        {confirmDelete.show && (
          <div className="foro-admin-overlay">
            <div className="foro-admin-confirmation-popup">
              <h2>¿Estás seguro de que deseas eliminar esta publicación?</h2>
              <div className="foro-admin-confirmation-buttons">
                <button className="foro-admin-confirm-button" onClick={() => handleDeletePost(confirmDelete.postId!)}>Sí</button>
                <button className="foro-admin-cancel-button" onClick={handleCancelDelete}>No</button>
              </div>
            </div>
          </div>
        )}

        {/* Pop-up de confirmación para bloquear usuario */}
        {confirmBlock.show && (
          <div className="foro-admin-overlay">
            <div className="foro-admin-confirmation-popup">
              <h2>¿Estás seguro de que deseas bloquear al usuario {confirmBlock.usuario}?</h2>
              <div className="foro-admin-confirmation-buttons">
                <button className="foro-admin-confirm-button" onClick={() => handleBlockUser(confirmBlock.usuario!)}>Sí</button>
                <button className="foro-admin-cancel-button" onClick={handleCancelBlock}>No</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </IonPage>
  );
};
