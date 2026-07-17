import { createAsyncThunk } from '@reduxjs/toolkit';
import { battleApi } from '../../api/battleApi';

export const runBattle = createAsyncThunk(
  'battle/runBattle',
  async (prompt, { rejectWithValue }) => {
    try {
      const data = await battleApi.submitPrompt(prompt);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred during the battle.';
      return rejectWithValue(message);
    }
  }
);
