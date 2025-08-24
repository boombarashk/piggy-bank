import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_DATA_URL, CATEGORIES_FILENAME } from "../../consts";
import { TCategoriesState, TCategory } from "../../types";

export const getCategoriesData = createAsyncThunk(
  `categories/get`,
  async (): Promise<{ data: TCategory[] }> => {
    const response = await axios.get(API_DATA_URL, {
      params: { filename: CATEGORIES_FILENAME },
    });
    return { data: response.data };
  },
);

// Сохранение новых данных в файл путем отправки POST-запроса
export const saveCategories = createAsyncThunk(
  "categories/save",
  async ({
    data,
  }: Pick<TCategoriesState, "data">): Promise<{ data: TCategory[] }> => {
    // Отправляем новый список категорий методом POST
    await axios.post(API_DATA_URL, {
      filename: CATEGORIES_FILENAME,
      data,
    });
    return { data };
  },
);

const initialState: TCategoriesState = {
  data: [] as TCategory[],
  loaded: false,
};

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
