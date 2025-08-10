// базовая конфигурация хранилища
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "@/services/reducers/categories";
import dataReducer from "@/services/reducers/data";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  data: dataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // middleware
});
