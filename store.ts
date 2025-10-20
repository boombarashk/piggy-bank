// базовая конфигурация хранилища
import { useDispatch } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "@/services/reducers/categories";
import expensesReducer from "@/services/reducers/expenses";
import incomesReducer from "@/services/reducers/incomes";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  expenses: expensesReducer,
  incomes: incomesReducer,
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
export const useExpensesSelector = (state: TRootState) => state.expenses;
export const useIncomesSelector = (state: TRootState) => state.incomes;
export const useLoadingSelector = (state: TRootState) =>
  state.categories.loading;
