// базовая конфигурация хранилища
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  category: {},
  data: {},
};

export const store = configureStore({
  reducer: (state = initialState, action) => {
    switch(action.type) {
      //todo add scategory
      case 'SET_DATA':
        return {...state, data: action.payload };
      //todo add expense by category
      default:
        return state;
    }
  },
});
