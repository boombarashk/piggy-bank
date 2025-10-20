import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_FILES_URL } from "../../consts";
import { EntityEnum, TIncome, TIncomesState } from "../../types";

export const getIncomes = createAsyncThunk(`incomes/get`, async () => {
  const response = await axios.get(
    `${API_FILES_URL}?name=${EntityEnum.incomes}`,
  );
  return response.data;
});

export const saveIncomes = createAsyncThunk(
  "inomes/save",
  async (data: Record<string, TIncome>) => {
    await axios.post(`${API_FILES_URL}?name=${EntityEnum.incomes}`, data);
    return data;
  },
);

export const addIncome = ({
  data = {},
  month,
  year,
  sum,
}: {
  data: Record<string, TIncome | undefined>;
  month: string;
  year: string;
  sum: string;
}): Record<string, TIncome> => {
  if (Number(sum) < 0 || !year) {
    return data as Record<string, TIncome>;
  }

  let currentIncomes: TIncome = data[`${year}`] as unknown as TIncome;
  if (!currentIncomes) {
    currentIncomes = {};
  }
  let currentMonthIncomes: number = currentIncomes[`${month}`];
  if (!currentMonthIncomes) {
    currentMonthIncomes = 0;
  }

  return {
    ...data,
    [year]: {
      ...currentIncomes,
      [month]: +(currentMonthIncomes + +sum).toFixed(2),
    },
  } as Record<string, TIncome>;
};

const initialState = { loading: true } as Partial<TIncomesState>;

const incomesSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getIncomes.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getIncomes.fulfilled, (state, action) => {
      state.loading = false;
      for (const year in action.payload) {
        state[year] = { ...action.payload[year] };
      }
    });
    builder.addCase(saveIncomes.fulfilled, (state, action) => {
      state.loading = false;
      for (const year in action.payload) {
        state[year] = { ...action.payload[year] };
      }
    });
  },
});

export default incomesSlice.reducer;
