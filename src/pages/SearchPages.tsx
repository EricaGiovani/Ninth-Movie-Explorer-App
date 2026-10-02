import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '@/hooks/useMovies';
import { SearchBar } from '@/components/Feature Components/SearchBar';
import { MovieListItem } from '@/components/Feature Components/MovieListItem';
import { EmptyState } from '@/components/Feature Components/EmptyMovie';
import notFoundIcon from '@/assets/icons/Logo Frame.svg';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') ?? '';

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [page, setPage] = useState(1);
  const [prevQuery, setPrevQuery] = useState(queryFromUrl);

  if (queryFromUrl !== prevQuery) {
    setPrevQuery(queryFromUrl);
    setPage(1);
  }

  const { data, isLoading, isFetching } = useSearchMovies(queryFromUrl, page);


  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      setSearchParams({ q: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  const movies = data?.results ?? [];
  const hasQuery = queryFromUrl.trim().length > 0;
  const showNotFound = hasQuery && !isLoading && movies.length === 0;
  const showResults = hasQuery && movies.length > 0;

  return (
    <div className="min-h-screen bg-black">
      <SearchBar value={inputValue} onChange={handleInputChange} />

      <main className="px-2xl md:px-11xl py-4xl md:py-6xl min-h-[calc(100vh_-_80px)]">
        {showResults && (
          <div className="flex flex-col space-y-4xl md:space-y-6xl">
            {movies.map((movie) => (
              <MovieListItem key={movie.id} movie={movie} />
            ))}

            {data && page < data.total_pages && (
              <div className="flex justify-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={isFetching}
                  className="bg-gray-950 border border-gray-900 text-white text-sm font-semibold rounded-full w-[200px] h-[44px] disabled:opacity-50"
                >
                  {isFetching ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}

        {showNotFound && (
          <EmptyState
            icon={notFoundIcon}
            title="Data Not Found"
            description="Try other keywords"
          />
        )}
      </main>
    </div>
  );
}