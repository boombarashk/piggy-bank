// базовая конфигурация хранилища
import { useDispatch } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "@/services/reducers/categories";
import dataReducer from "@/services/reducers/data";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  data: dataReducer,
});

type TRootState = ReturnType<typeof rootReducer>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const store = configureStore({
  reducer: rootReducer,
  // middleware
});

export const useCategoriesSelector = (state: TRootState) =>
  state.categories.data;
export const useDataSelector = (state: TRootState) => state.data;
export const useLoadedSelector = (state: TRootState) => state.categories.loaded;
