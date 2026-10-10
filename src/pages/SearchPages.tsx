import { useState, useMemo, useCallback } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuerry';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { movieService } from '@/services/movieService';
import { useQueries } from '@tanstack/react-query';
import { SearchBar } from '@/components/Feature Components/SearchBar';
import { MovieListItem } from '@/components/Feature Components/MovieListItem';
import { EmptyState } from '@/components/Feature Components/EmptyMovie';
import notFoundIcon from '@/assets/icons/Logo Frame.svg';

type Option =
  | 'default'
  | 'rating-highest'
  | 'rating-lowest'
  | 'date-newest'
  | 'date-oldest'
  | 'popularity-desc';

export function SearchPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<Option>('default');

  // URL = satu-satunya sumber kata kunci (Navbar desktop & SearchBar mobile sama-sama menulis ke sini)
  const query = searchParams.get('q') ?? '';

  // Reset ke halaman 1 setiap kata kunci berubah
  const [searchPages, setSearchPages] = useState([1]);
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSearchPages([1]);
  }

  const searchQueries = useQueries({
    queries: searchPages.map((page) => ({
      queryKey: ['movies', 'search', query, page],
      queryFn: () => movieService.searchMovies(query, page),
      enabled: query.trim().length > 0,
    })),
  });

  const allMovies = useMemo(
    () => searchQueries.flatMap((q) => q.data?.results ?? []),
    [searchQueries]
  );

  const isLoading = searchQueries[0]?.isLoading ?? false;
  const isFetching = searchQueries.some((q) => q.isFetching);
  const isError = searchQueries.some((q) => q.isError);
  const totalPages = searchQueries.at(-1)?.data?.total_pages ?? 1;

  const handleLoadMore = () => {
    if (searchPages.length < totalPages) {
      setSearchPages((prev) => [...prev, prev.length + 1]);
    }
  };

  // Dipakai SearchBar mobile (live typing) -> tulis ke URL tanpa menambah history
  const handleInputChange = useCallback(
    (value: string) => {
      if (value === query) return;
      setSearchParams(value.trim() ? { q: value } : {}, { replace: true });
    },
    [query, setSearchParams]
  );

  const handleBack = () => navigate(-1);

  const sortedMovies = useMemo(() => {
    const result = [...allMovies];
    switch (sortBy) {
      case 'rating-highest': return result.sort((a, b) => b.vote_average - a.vote_average);
      case 'rating-lowest': return result.sort((a, b) => a.vote_average - b.vote_average);
      case 'date-newest': return result.sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''));
      case 'date-oldest': return result.sort((a, b) => (a.release_date || '').localeCompare(b.release_date || ''));
      case 'popularity-desc': return result.sort((a, b) => b.popularity - a.popularity);
      default: return result;
    }
  }, [allMovies, sortBy]);

  const hasQuery = query.trim().length > 0;
  const showNotFound = hasQuery && !isLoading && !isError && allMovies.length === 0;
  const showResults = hasQuery && allMovies.length > 0;
  const showError = hasQuery && !isLoading && isError;

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile saja (<md). Di md ke atas pakai search bar Navbar */}
      {isMobile && (
  <SearchBar value={query} onChange={handleInputChange} onBack={handleBack} />
)}
      

      <main className="px-2xl md:px-11xl py-4xl md:pt-[140px] md:pb-6xl min-h-[calc(100vh_-_80px)]">
        {showResults && (
          <div className="flex flex-col space-y-4xl md:space-y-6xl">
            <div className="flex justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as Option)}
                className="rounded-2xl border border-gray-900 bg-background/60 backdrop-blur-md px-xl py-md text-sm text-white outline-none focus:border-primary-300"
              >
                <option value="default">Sort By</option>
                <option value="rating-highest">Highest Rated</option>
                <option value="rating-lowest">Lowest Rated</option>
                <option value="date-newest">Newest</option>
                <option value="date-oldest">Oldest</option>
                <option value="popularity-desc">Most Popular</option>
              </select>
            </div>

            {sortedMovies.map((movie) => (
              <MovieListItem key={movie.id} movie={movie} />
            ))}

            {searchPages.length < totalPages && (
              <div className="flex justify-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  variant="secondary"
                  className="w-[200px] h-[44px] xl:w-[230px] xl:h-[52px] rounded-full text-sm lg:text-[15px] xl:text-md bg-background border border-gray-900 text-gray-25 backdrop-blur-md"
                >
                  {isFetching ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </div>
        )}

        {showNotFound && (
          <EmptyState icon={notFoundIcon} title="Data Not Found" description="Try other keywords" />
        )}

        {showError && (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
            <p className="mt-md text-sm text-gray-400">Failed to load movies. Please try again.</p>
          </div>
        )}
      </main>
    </div>
  );
}