import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '@/types/movie';

// TODO: Define your store state interface
interface MovieStore {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
  clearFavorites: () => void;

  toastMessage: string | null;
  showToast: (message: string) => void;

}

// TODO: Create Zustand store
// Reference: https://zustand.docs.pmnd.rs/getting-started/introduction

let toastTimeoutId: ReturnType<typeof setTimeout> | undefined;

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (movie) =>
        set((state) => {
          if (state.favorites.some((m) => m.id === movie.id)) return state;
          return { favorites: [...state.favorites, movie] };
        }),

      removeFromFavorites: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),

      toggleFavorite: (movie) => {
        const { isFavorite, addToFavorites, removeFromFavorites, showToast } = get();
        if (isFavorite(movie.id)) {
          removeFromFavorites(movie.id);
        } else {
          addToFavorites(movie);
          showToast('Success Add to Favorites');
        }
      },

      isFavorite: (movieId) => get().favorites.some((m) => m.id === movieId),

      clearFavorites: () => set({ favorites: [] }),

      // Toast
      toastMessage: null,
      showToast: (message) => {
        set({ toastMessage: message });
        if (toastTimeoutId) clearTimeout(toastTimeoutId);
        toastTimeoutId = setTimeout(() => set({ toastMessage: null }), 2200);
      },
    }),
    {
      name: 'movie-favorites',
      partialize: (state) => ({ favorites: state.favorites }), 
    }
  )
);