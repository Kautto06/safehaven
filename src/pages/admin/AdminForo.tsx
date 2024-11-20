import React, { useState, useEffect } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import { obtenerAllPublicaciones, eliminarForo } from './services/publicaciones';
import { updateEstadoUser } from './services/usuarios';
import { getAllUser } from './services/usuarios'; // Asegúrate de importar esta función

import '../../assets/admin/AdminForo.css';

interface Publicacion {
  ID: number;
  Titulo: string;
  Likes: number;
  ID_Usuario: string;
  Contenido: string;
  img_public?: string;
}

interface User {
  email: string;
  phone: string;
  password: string;
  birthday: string;
  genero: string;
  nombre: string;
  apellidos: string;
  estado: string;
}

export const AdminForo: React.FC = () => {
  const history = useHistory();

  // Estado para las publicaciones y usuarios
  const [posts, setPosts] = useState<Publicacion[]>([]); 
  const [users, setUsers] = useState<User[]>([]);  // Nuevo estado para los usuarios
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; postId: number | null }>({ show: false, postId: null });
  const [confirmBlock, setConfirmBlock] = useState<{ show: boolean; usuario: string | null }>({ show: false, usuario: null });
  const [blockMessage, setBlockMessage] = useState<string | null>(null);

  // Llamar a la API para obtener las publicaciones y los usuarios al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener publicaciones
        const postsData = await obtenerAllPublicaciones();
        setPosts(postsData);

        // Obtener usuarios
        const usersData = await getAllUser();
        setUsers(usersData);
      } catch (error) {
        console.error('Error al obtener las publicaciones o usuarios:', error);
      }
    };

    fetchData();
  }, []);

  const handleConfirmDelete = (id: number) => {
    setConfirmDelete({ show: true, postId: id });
  };

  const handleCancelDelete = () => {
    setConfirmDelete({ show: false, postId: null });
  };

  const handleDeletePost = async (id: number) => {
    try {
      await eliminarForo(id);
      setPosts(posts.filter(post => post.ID !== id)); // Actualiza el estado después de eliminar
      setConfirmDelete({ show: false, postId: null });
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  };

  const handleConfirmBlock = (usuario: string) => {
    setConfirmBlock({ show: true, usuario });
  };

  const handleCancelBlock = () => {
    setConfirmBlock({ show: false, usuario: null });
  };

  const handleBlockUser = async (usuario: string) => {
    try {
      // Llama a la API para actualizar el estado del usuario a "Bloqueado"
      await updateEstadoUser("Bloqueado", usuario);

      // Muestra el mensaje de confirmación
      setBlockMessage(`El usuario ${usuario} ha sido bloqueado.`);

      // Actualizar el estado de los usuarios bloqueados sin eliminar las publicaciones
      setUsers(users.map(user =>
        user.email === usuario ? { ...user, estado: 'Bloqueado' } : user
      ));

      setConfirmBlock({ show: false, usuario: null });

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setBlockMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error al bloquear al usuario:", error);
    }
  };

  const handleUnblockUser = async (usuario: string) => {
    try {
      // Llama a la API para actualizar el estado del usuario a "Activo"
      await updateEstadoUser("Activo", usuario);

      // Muestra el mensaje de confirmación
      setBlockMessage(`El usuario ${usuario} ha sido desbloqueado.`);

      // Actualizar el estado de los usuarios desbloqueados
      setUsers(users.map(user =>
        user.email === usuario ? { ...user, estado: 'Activo' } : user
      ));

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setBlockMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error al desbloquear al usuario:", error);
    }
  };

  const handleGoBack = () => {
    history.push("/admin"); // Cambia '/admin' por la ruta correspondiente a tu página principal de administración
  };

  // Función para obtener los datos completos del usuario basado en el email
  const getUserInfo = (email: string) => {
    return users.find(user => user.email === email);
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

        <div className="back-button-container-admin">
          <button className="back-button-admin" onClick={handleGoBack}>
            Volver a la página principal
          </button>
        </div>

        <section className="foro-admin-post-list">
        <h2>Mensajes del Foro</h2>
        {posts.length === 0 ? (
          <div className="foro-admin-empty-message">
            <p>No hay publicaciones en el foro por el momento.</p>
            <p>¡Sé el primero en compartir algo interesante!</p>
          </div>
        ) : (
          posts.map((post) => {
            const userInfo = getUserInfo(post.ID_Usuario);  // Obtener los datos del usuario

            return (
              <div key={post.ID} className="foro-admin-post-card">
                <div className="foro-admin-post-header">
                  <strong>{userInfo?.nombre} {userInfo?.apellidos}</strong> {/* Muestra el nombre completo */}
                  <p>{userInfo?.estado === 'Bloqueado' ? "(Bloqueado)" : "(Activo)"}</p> {/* Muestra el estado */}
                </div>
                <div className="foro-admin-post-content">
                  <p>{post.Contenido}</p>
                </div>
                <div className="foro-admin-post-actions">
                  <button 
                    className="foro-admin-moderate-button" 
                    onClick={() => handleConfirmDelete(post.ID)}
                  >
                    Eliminar
                  </button>
                  {userInfo?.estado === 'Activo' ? (
                    <button 
                      className="foro-admin-moderate-button" 
                      onClick={() => handleConfirmBlock(post.ID_Usuario)}
                    >
                      Bloquear Usuario
                    </button>
                  ) : (
                    <button 
                      className="foro-admin-moderate-button" 
                      style={{ backgroundColor: 'green' }} 
                      onClick={() => handleUnblockUser(post.ID_Usuario)}
                    >
                      Desbloquear Usuario
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </section>
        {blockMessage && (
          <div className="foro-admin-block-message">
            <p>{blockMessage}</p>
          </div>
        )}

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
