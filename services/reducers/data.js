import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveJsonToFile } from "../savejsontofile";



const initialState = {}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  }
)

export default dataSlice.reducer