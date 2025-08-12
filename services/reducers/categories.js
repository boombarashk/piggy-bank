import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_DATA_URL, CATEGORIES_FILENAME } from "../../consts";

export const getCategoriesData = createAsyncThunk(
  `categories/get`,
  async () => {
    const response = await axios.get(API_DATA_URL, {
      params: { filename: CATEGORIES_FILENAME },
    });
    return response.data;
  },
);

// Сохранение новых данных в файл путем отправки POST-запроса
export const saveCategories = createAsyncThunk(
  "categories/save",
  async (data) => {
    // Отправляем новый список категорий методом POST
    await axios.post(API_DATA_URL, {
      filename: CATEGORIES_FILENAME,
      data,
    });
    return data;
  },
);

const initialState = { data: [], loaded: false };

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setColorByIndex(state, action) {
      const { color, index } = action.payload;
      state.data[index].color = color;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCategoriesData.rejected, (state) => {
      state.loaded = true;
      //console.error
    });
    builder.addCase(getCategoriesData.fulfilled, (state, action) => {
      state.loaded = true;
      state.data = action.payload.data;
    });
    builder.addCase(saveCategories.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const { setColorByIndex } = categoriesSlice.actions;
export default categoriesSlice.reducer;
