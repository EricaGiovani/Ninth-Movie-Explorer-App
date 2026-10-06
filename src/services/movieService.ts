import api from '@/lib/axios';
import type { MovieResponse, MovieDetails, Credits, VideoResponse, ReleaseDatesResponse } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

export const movieService = {
  // Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get<MovieResponse>('/movie/popular', {
      params: { page },
    });

    return response.data;
  },

  // Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing
  getNowPlayingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get<MovieResponse>('/movie/now_playing', {
      params: { page },
    });

    return response.data;
  },

  // Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await api.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  },

  // Implement searchMovies function
  // Endpoint: GET /search/movie
  searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
    const response = await api.get<MovieResponse>('/search/movie', {
      params: { query,page },
    });

    return response.data;
  },

  // Implement getMovieCredits function
  // Endpoint: GET /movie/{movie_id}/credits
  getMovieCredits: async (movieId: number): Promise<Credits> => {
    const response = await api.get<Credits>(`/movie/${movieId}/credits`);
    return response.data;
  },

  // Implement getSimilarMovies function
  // Endpoint: GET /movie/{movie_id}/similar
  getSimilarMovies: async (movieId: number,page: number = 1): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>(`/movie/${movieId}/similar`,{
      params: { page },
    }
  );
  return response.data;
  },

  // Implement getMovieVideos function
  // Endpoint: GET /movie/{movie_id}/videos
  getMovieVideos: async (movieId: number): Promise<VideoResponse> => {
    const response = await api.get<VideoResponse>(`/movie/${movieId}/videos`);
    return response.data;
  },

  // Implement getMovieReleaseDates function
  // Endpoint: GET /movie/{movie_id}/release_dates
  getMovieReleaseDates: async (movieId: number): Promise<ReleaseDatesResponse> => {
    const response = await api.get<ReleaseDatesResponse>(`/movie/${movieId}/release_dates`);
    return response.data;
  },
};
