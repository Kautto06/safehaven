
export interface User {
  name: string;
  lastName: string;
  email: string;
  birthday: string; // Fecha de nacimiento
  phone: string;
  gender: string; // Número de teléfono
}
  
interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: User | {}; // Puede ser un usuario o un objeto vacío
  errorMessage: string | undefined;
}
  


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  status: 'checking', // puede ser 'checking', 'authenticated', 'not-authenticated'
  user: {}, // Aquí irá la información del usuario autenticado
  errorMessage: undefined, // Mensaje de error en caso de que falle el login o logout
  
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, action: PayloadAction<string | undefined>) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
export default authSlice.reducer;
