import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSearchMovies } from '@/hooks/useMovies';
import { Button } from '@/components/ui/button';
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
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError} = useSearchMovies(inputValue,page);

  const handleInputChange = (value: string) => {setInputValue(value); setPage(1);};
  const handleBack = () => {setInputValue(''); navigate(-1);};

  const movies = useMemo(() => data?.results ?? [], [data?.results]);

  const sortedMovies = useMemo(() => {
  const result = [...movies];
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
}, [movies, sortBy]);


  const hasQuery = inputValue.trim().length > 0;

  const showNotFound = hasQuery && !isLoading && !isError && movies.length === 0;
  const showResults = hasQuery && movies.length > 0;
  const showError = hasQuery && !isLoading && isError;

  return (
  <div className="min-h-screen bg-black">
    <SearchBar
      value={inputValue}
      onChange={handleInputChange}
      onBack={handleBack}
    />

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
              movie={movie}
            />
          ))}

          {data && page < data.total_pages && (
            <div className="flex justify-center">
              <Button
                onClick={() => setPage((p) => p + 1)}
                disabled={isFetching}
                variant="secondary"
                className="w-[200px] h-[44px] text-sm">
                {isFetching ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      )}
      {/* NO RESULT */}
      {showNotFound && (
        <EmptyState
          icon={notFoundIcon}
          title="Data Not Found"
          description="Try other keywords"
        />
      )}
      {/* ERROR */}
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