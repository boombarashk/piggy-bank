import { createSlice } from "@reduxjs/toolkit";
import { CURRENT_MONTH_IND, CURRENT_YEAR } from "../../consts";

const initialState: {
  year: string;
  selectedMonth: string;
} = {
  year: CURRENT_YEAR,
  selectedMonth: CURRENT_MONTH_IND,
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setYear(state, action) {
      state.year = action.payload;
    },
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setYear, setSelectedMonth } = optionsSlice.actions;
export default optionsSlice.reducer;
