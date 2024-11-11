import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const UserProfile: React.FC = () => {
  const { user, status } = useSelector((state: RootState) => state.auth);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES').format(date); // Devuelve la fecha en formato "dd/mm/yyyy"
  };

  // Comprobar si 'user' tiene las propiedades necesarias
  if (status !== 'authenticated' || !user || !('name' in user)) {
    return <p>Loading...</p>;
  }
  
  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {user.name}</p>
      <p>Apellido: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Fecha de Nacimiento: {formatDate(user.birthday)}</p>
      <p>Teléfono: {user.phone}</p>
    </div>
  );
}
export default UserProfile;
