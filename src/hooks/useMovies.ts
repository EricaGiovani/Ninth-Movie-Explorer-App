import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Hook to fetch popular movies
export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => movieService.getPopularMovies(page),
    staleTime: 5 * 60 * 1000, 
    placeholderData: keepPreviousData,
  });
};

// Hook to fetch now playing movies
export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => movieService.getNowPlayingMovies(page),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

// Hook to fetch movie details
export const useMovieDetails = (movieId: number | undefined) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieService.getMovieDetails(movieId as number),
    enabled: !!movieId, 
  });
};

// Hook to search movies
export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => movieService.searchMovies(query, page),
    enabled: query.trim().length > 0, 
    placeholderData: keepPreviousData,
  });
};

// Hook to fetch movie credits (cast & crew)
export const useMovieCredits = (movieId: number | undefined) => {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => movieService.getMovieCredits(movieId as number),
    enabled: !!movieId,
  });
};

// Hook to fetch similar movies
export const useSimilarMovies = (movieId: number | undefined, page: number = 1) => {
  return useQuery({
    queryKey: ['movie', movieId, 'similar', page],
    queryFn: () => movieService.getSimilarMovies(movieId as number, page),
    enabled: !!movieId,
  });
};

// Hook to fetch movie videos (trailer)
export const useMovieVideos = (movieId: number | undefined) => {
  return useQuery({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => movieService.getMovieVideos(movieId as number),
    enabled: !!movieId,
  });
};



