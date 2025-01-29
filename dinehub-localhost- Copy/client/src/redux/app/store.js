import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import FavSlice from '../features/FavSlice'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'



// create store
const persistConfig = {
    key: 'root',
    storage,
  }


let rootReducer = combineReducers({
    allCart:cartSlice,
    allfav : FavSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer : persistedReducer
})