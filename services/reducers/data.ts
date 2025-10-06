import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_FILES_URL } from "../../consts";
import { EntityEnum, TExpense, TNewExpense } from "../../types";

export const getData = createAsyncThunk(`data/get`, async () => {
  const response = await axios.get(
    `${API_FILES_URL}?name=${EntityEnum.expenses}`,
  );
  return response.data;
});

// Сохранение новых данных в файл
export const saveData = createAsyncThunk(
  "data/save",
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

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getData.rejected, () => {
      //console.error
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      return { ...action.payload };
    });
    builder.addCase(saveData.fulfilled, (state, action) => {
      return { ...(action.payload as unknown as object) };
    });
  },
});

export default dataSlice.reducer;
