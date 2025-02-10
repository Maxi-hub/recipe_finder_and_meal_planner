import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../reducers/recipeSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";  // Используем localStorage

const persistConfig = {
    key: 'root', // Ключ для хранения в localStorage
    storage, // Используем localStorage
}

const persistedReducer = persistReducer(persistConfig, recipeReducer);

export const store = configureStore({
    reducer: {
        recipe: persistedReducer, // Используем редьюсер с Persist
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Отключаем проверку сериализуемости
        }),
    
});

export const persistor = persistStore(store);
