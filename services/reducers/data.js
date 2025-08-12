import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_DATA_URL, DATA_FILENAME } from "../../consts";
import { act } from "react";

export const getData = createAsyncThunk(`data/get`, async () => {
  const response = await axios.get(API_DATA_URL, {
    params: { filename: DATA_FILENAME },
  });
  return response.data;
});

// Сохранение новых данных в файл
export const saveData = createAsyncThunk("data/save", async (data) => {
  await axios.post(API_DATA_URL, {
    filename: DATA_FILENAME,
    data,
  });
  return data;
});

export const addExpense = ({ data = {}, month, year, categoryId, sum }) => {
  if (!categoryId || sum < 0) {
    return data;
  }

  let currentExpenses = data[`${year}`];
  if (!currentExpenses) {
    currentExpenses = {};
  }

  let currentMonthExpenses = currentExpenses[`${month}`];
  if (!currentMonthExpenses) {
    currentMonthExpenses = {};
  }

  let sumInCategory = currentMonthExpenses[categoryId];
  if (!sumInCategory) {
    sumInCategory = 0;
  }

  return {
    ...data,
    [year]: {
      ...currentExpenses,
      [month]: {
        ...currentMonthExpenses,
        [categoryId]: sumInCategory + +sum,
      },
    },
  };
};

const initialState = {};

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
      return { ...action.payload };
    });
  },
});

export default dataSlice.reducer;
