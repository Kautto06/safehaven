import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Almacenamiento en localStorage
import authSlice from './auth/authSlice'; // Tu slice de auth

// Configuración de persistencia para authSlice
const persistConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

// Configuración del store
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, // Usa el reducer persistido
        // otros reducers si los tienes
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Desactiva esta verificación para redux-persist
        }),
});

// Configuración del persistor
export const persistor = persistStore(store);

// Definir el tipo RootState basado en los reducers de tu store
export type RootState = ReturnType<typeof store.getState>;

// Exportar el store y el persistor
export default store;
