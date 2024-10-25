import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice'; // Tu slice de auth

// Configuración del store
export const store = configureStore({
    reducer: {
        auth: authSlice,
        // otros reducers si los tienes
    },
});

// Definir el tipo RootState basado en los reducers de tu store
export type RootState = ReturnType<typeof store.getState>;

// Exportar el store
export default store;