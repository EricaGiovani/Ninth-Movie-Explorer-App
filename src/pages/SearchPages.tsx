import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { movieService } from '@/services/movieService';
import { useQueries } from '@tanstack/react-query';
import { SearchBar } from '@/components/Feature Components/SearchBar';
import { MovieListItem } from '@/components/Feature Components/MovieListItem';
import { EmptyState } from '@/components/Feature Components/EmptyMovie';
import notFoundIcon from '@/assets/icons/Logo Frame.svg';

type Option =
  |'default'
  |'rating-highest'
  |'rating-lowest'
  |'date-newest'
  |'date-oldest'
  |'popularity-desc';

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<Option>('default');

  const queryFromUrl = searchParams.get('q') ?? '';

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [searchPages, setSearchPages] = useState([1]);

  const searchQueries = useQueries({
    queries: searchPages.map((page) => ({
      queryKey: ['movies', 'search', inputValue, page],
      queryFn: () => movieService.searchMovies(inputValue, page),
      enabled: inputValue.trim().length > 0,
    })),
  });

  const allMovies = useMemo(
    () => searchQueries.flatMap((query) => query.data?.results ?? []),
    [searchQueries]
  );

  const isLoading = searchQueries[0]?.isLoading ?? false;
  const isFetching = searchQueries.some((query) => query.isFetching);
  const isError = searchQueries.some((query) => query.isError);
  const totalPages = searchQueries.at(-1)?.data?.total_pages ?? 1;

  const handleLoadMore = () => {
  if (searchPages.length < totalPages) {
    setSearchPages((prev) => [...prev, prev.length + 1]);
  }
  };

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setSearchPages([1]);
  }, []);

  const handleBack = () => {setInputValue(''); navigate(-1);};

  const sortedMovies = useMemo(() => {
  const result = [...allMovies];

  switch (sortBy) {
    case 'rating-highest':
      return result.sort((a, b) => b.vote_average - a.vote_average);
    case 'rating-lowest':
      return result.sort((a, b) => a.vote_average - b.vote_average);
    case 'date-newest':
      return result.sort((a, b) =>
        (b.release_date || '').localeCompare(a.release_date || '')
      );
    case 'date-oldest':
      return result.sort((a, b) =>
        (a.release_date || '').localeCompare(b.release_date || '')
      );
    case 'popularity-desc':
      return result.sort((a, b) => b.popularity - a.popularity);
    default:
      return result;
  }
  }, [allMovies, sortBy]);

  const hasQuery = inputValue.trim().length > 0;

  const showNotFound = hasQuery && !isLoading && !isError && allMovies.length === 0;
  const showResults = hasQuery && allMovies.length > 0;
  const showError = hasQuery && !isLoading && isError;

  return (
    <div className="min-h-screen bg-black">
    <SearchBar
      value={inputValue}
      onChange={handleInputChange}
      onBack={handleBack} />

    <main className="px-2xl md:px-11xl py-4xl md:py-6xl min-h-[calc(100vh_-_80px)]">
      {showResults && (
        <div className="flex flex-col space-y-4xl md:space-y-6xl">
          <div className="flex justify-end">

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as Option)}
              className="rounded-2xl border border-gray-900 bg-background/60 backdrop-blur-md px-xl py-md text-sm text-white outline-none focus:border-primary-300">
              <option value="default">Sort By</option>
              <option value="rating-highest">Highest Rated</option>
              <option value="rating-lowest">Lowest Rated</option>
              <option value="date-newest">Newest</option>
              <option value="date-oldest">Oldest</option>
              <option value="popularity-desc">Most Popular</option>
            </select>
          </div>

          {sortedMovies.map((movie) => (
            <MovieListItem
              key={movie.id}
              movie={movie}/>
          ))}

          {searchPages.length < totalPages && (
            <div className="flex justify-center">
              <Button
                onClick={handleLoadMore}
                disabled={isFetching}
                variant="secondary"
                className="w-[200px] h-[44px] xl:w-[230px] xl:h-[52px] rounded-full text-sm lg:text-[15px] xl:text-md bg-background border border-gray-900 text-gray-25 backdrop-blur-md">
                {isFetching ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Empty search result */}
      {showNotFound && (
        <EmptyState
          icon={notFoundIcon}
          title="Data Not Found"
          description="Try other keywords"/>
      )}

      {/* Search request error */}
      {showError && (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-white">
          Something went wrong
        </h2>
        <p className="mt-md text-sm text-gray-400">
          Failed to load movies. Please try again.
        </p>
      </div>
      )}
    </main>
  </div>
);
}