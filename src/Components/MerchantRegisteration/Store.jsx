// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from "./FormSlice"

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;