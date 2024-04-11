
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../auth/authSlice';
import todoReducer from '../features/todo/todoSlice';


// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// Combining both auth and todo reducers
const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer, // Adding the todoReducer to the store
});

// Persisting the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the store
const store = configureStore({
    reducer: persistedReducer, // Use the persisted combined reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ignore the 'persist/PERSIST' action
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
