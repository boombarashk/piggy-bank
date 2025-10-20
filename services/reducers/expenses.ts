import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_FILES_URL } from "../../consts";
import { EntityEnum, TExpense, TNewExpense } from "../../types";

export const getExpensesData = createAsyncThunk(`expenses/get`, async () => {
  const response = await axios.get(
    `${API_FILES_URL}?name=${EntityEnum.expenses}`,
  );
  return response.data;
});

// Сохранение новых данных в файл
export const saveExpensesData = createAsyncThunk(
  "expenses/save",
  async (data: Partial<TNewExpense>) => {
    await axios.post(`${API_FILES_URL}?name=${EntityEnum.expenses}`, data);
    return data;
  },
);

export const addExpense = ({
  data = {},
  month,
  year,
  categoryId,
  sum,
}: TNewExpense) => {
  if (!categoryId || sum < 0 || !year) {
    return data;
  }

  let currentExpenses: Record<string, TExpense> = data[
    `${year}`
  ] as unknown as Record<string, TExpense>;
  if (!currentExpenses) {
    currentExpenses = {};
  }

  let currentMonthExpenses: TExpense = currentExpenses[`${month}`];
  if (!currentMonthExpenses) {
    currentMonthExpenses = {};
  }

  let sumInCategory: number = currentMonthExpenses[categoryId];
  if (!sumInCategory) {
    sumInCategory = 0;
  }

  return {
    ...data,
    [year]: {
      ...currentExpenses,
      [month]: {
        ...currentMonthExpenses,
        [categoryId]: +(sumInCategory + +sum).toFixed(2),
      },
    },
  };
};

const initialState = {} as Record<string, TExpense>;

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getExpensesData.rejected, () => {
      //console.error
    });
    builder.addCase(getExpensesData.fulfilled, (state, action) => {
      return { ...action.payload };
    });
    builder.addCase(saveExpensesData.fulfilled, (state, action) => {
      return { ...(action.payload as unknown as object) };
    });
  },
});

export default expensesSlice.reducer;
