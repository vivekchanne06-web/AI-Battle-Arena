import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const battleApi = {
  submitPrompt: async (question) => {
    const response = await api.post('/use-graph', { question });
    return response.data;
  },
};
