import { useDispatch, useSelector } from 'react-redux';
import pageApi from '../api/backend'; // Tu instancia de axios para la API
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice'; // Importar tus acciones y reducers
import { RootState } from '../store/store'; // Importar RootState desde tu configuración de Redux
import { useState } from 'react'; // Importar useState para manejar el estado

// Tipos para los datos de login y registro
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: string;
  nombre:string;
  apellidos:string;
}

// Tipos para el estado de autenticación y el usuario
interface User {
  name: string;
  lastName: string;
  email: string;
}

interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: User | {}; // Puede ser un usuario o un objeto vacío
  errorMessage: string | undefined;
}

// Hook de autenticación
export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state: RootState) => state.auth); // Obtener el estado de auth desde el store
  const dispatch = useDispatch();

  // Estado para manejar el mensaje de token expirado
  const [tokenExpired, setTokenExpired] = useState(false);

  // Función para iniciar sesión
  const startLogin = async ({ email, password }: LoginData) => {
    dispatch(onChecking());
  
    try {
      const { data } = await pageApi.post('/auth/login', { email, password });

           
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      console.log('Respuesta de la API:', data);
      
      console.log('Datos de usuario antes de despachar onLogin:', {
        name: data.nombre,
        lastName: data.apellidos,
        email: data.email,
        birthday: data.birthday,
        phone: data.phone
      });
  
      // Despachar acción onLogin con la información del usuario
      dispatch(onLogin({
        name: data.nombre,
        lastName: data.apellidos,
        email: data.email,
        birthday: data.birthday, 
        phone: data.phone, 
      }));
  
    } catch (error: any) {
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);

    }

  };

  // Función para registrar un nuevo usuario
  const startRegister = async ({ email, password, phone, birthday, gender,nombre,apellidos }: RegisterData) => {
    dispatch(onChecking());

    try {
      console.log(gender)
      const { data } = await pageApi.post('/auth/nuevo', { email, password, phone, birthday, gender,nombre,apellidos });



      // Despachar la acción de onLogin con el email y nombre del usuario
      dispatch(onLogin({  name: data.nombre, lastName: data.apellidos ,email: data.email, birthday:data.birthday, phone:data.phone}));
    } catch (error: any) {
      dispatch(onLogout(error.response.data?.msg || '--'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  // Función para verificar si el token sigue siendo válido
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(onLogout());
      return;
    }

    dispatch(onChecking())
  
    try {
      // Renueva el token y actualiza el estado de autenticación
      const { data } = await pageApi.get('/auth/renew', {
        headers: {
          'x-token': token, // Aquí se envía el token en los encabezados
        },
      });
  
      // Almacena el nuevo token y la información del usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
  
      dispatch(onLogin({ name: data.nombre, lastName: data.apellidos, email: data.email, birthday:data.birthday, phone:data.phone }));
      setTokenExpired(false); // Resetear el estado de token expirado
    } catch (error: any) {
      console.error('Error al renovar el token:', error); // Para depuración
      localStorage.clear();
      dispatch(onLogout());
      setTokenExpired(true); // Establecer estado de token expirado
    }
  };
  

  // Función para cerrar sesión
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  return {
    // Estado global del auth
    status,
    user, // El usuario contendrá el email y nombre
    errorMessage,
    tokenExpired, // Agregar tokenExpired para que puedas usarlo en el componente
    setTokenExpired, // Para poder resetear el estado

    // Métodos de autenticación
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
