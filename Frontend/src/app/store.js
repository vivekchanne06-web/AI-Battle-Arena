import { configureStore } from '@reduxjs/toolkit';
import battleReducer from '../features/battle/battleSlice';

export const store = configureStore({
  reducer: {
    battle: battleReducer,
  },
});
