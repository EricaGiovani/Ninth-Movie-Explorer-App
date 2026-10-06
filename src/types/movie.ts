// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

export interface Movie {
  // Add movie properties based on TMDB API response
  // Examples: id, title, overview, poster_path, etc.
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

export interface MovieResponse {
  // Add pagination properties
  // Examples: page, results, total_pages, total_results
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Add more types as needed (Genre, Video, etc.)
// Add Genre type
export interface Genre {
  id: number;
  name: string;
}

// add Movie Details type
export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  credits?: Credits;
  videos?: VideoResponse;
  similar?: MovieResponse;
}

// Add Cast type
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// Add Crew type
export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

// Add Credits type
export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

// Add Video type
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

// Add Video Response type
export interface VideoResponse {
  id: number;
  results: Video[];
}

// Add Release date type
export interface ReleaseDate {
  certification: string;
  release_date: string;
  type: number;
}

// Add Release Date Country type
export interface ReleaseDateCountry {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

// Add Release Dates Response type
export interface ReleaseDatesResponse {
  id: number;
  results: ReleaseDateCountry[];
}
