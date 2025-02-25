import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../reducers/recipeSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";  

const persistConfig = {
    key: 'root', 
    storage, 
}

const persistedReducer = persistReducer(persistConfig, recipeReducer);

export const store = configureStore({
    reducer: {
        recipe: persistedReducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, 
        }),
    
});

export const persistor = persistStore(store);
