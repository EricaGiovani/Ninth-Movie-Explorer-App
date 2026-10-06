import axios from 'axios';

// TODO: Create axios instance with base configuration
// Hint: Use environment variables for API URL and API key
// Reference: https://axios-http.com/docs/instance

// Centralized Axios instance for TMDB API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
});

// Add response interceptor for error handling
// Handle common TMDB API and network errors in one place
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) return Promise.reject(new Error('API key TMDB tidak valid.'));
      if (status === 404) return Promise.reject(new Error('Data tidak dapat ditemukan.'));
      if (status === 429) return Promise.reject(new Error('Request terlalu banyak, coba lagi.'));
      if (!error.response) return Promise.reject(new Error('Gagal terhubung ke TMDB.'));
    }
    return Promise.reject(error);
  }
);

export default api;
