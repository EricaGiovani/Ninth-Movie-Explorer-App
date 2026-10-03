// pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import { useMovieVideos } from '@/hooks/useMovies';
import { MovieGrid } from '@/components/Feature Components/MovieGrid';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils';
import playIcon from '@/assets/icons/Logo Play.svg';
import arrowIcon from '@/assets/icons/Logo Arrow.svg';

export function HomePage() {
  // ===== TRENDING NOW =====
  const [trendingPages, setTrendingPages] = useState([1]);
  const [trendingOffset, setTrendingOffset] = useState(0);

  const trendingQueries = useQueries({
    queries: trendingPages.map((page) => ({
      queryKey: ['movies', 'popular', page],
      queryFn: () => movieService.getPopularMovies(page),
    })),
  });

  const allTrending = useMemo(
    () => trendingQueries.flatMap((q) => q.data?.results ?? []),
    [trendingQueries]
  );
  const isTrendingLoading = trendingQueries[0]?.isLoading ?? true;
  const isTrendingFetching = trendingQueries.some((q) => q.isFetching);
  const trendingTotalPages = trendingQueries.at(-1)?.data?.total_pages ?? 1;

  const visibleTrending = allTrending.slice(trendingOffset, trendingOffset + 5);
  const canGoPrevTrending = trendingOffset > 0;
  const canGoNextTrending =
    trendingOffset + 5 < allTrending.length || trendingPages.length < trendingTotalPages;

  const handleTrendingNext = () => {
    const nextOffset = trendingOffset + 5;
    if (nextOffset + 5 > allTrending.length && trendingPages.length < trendingTotalPages) {
      setTrendingPages((prev) => [...prev, prev.length + 1]);
    }
    setTrendingOffset(nextOffset);
  };

  const handleTrendingPrev = () => {
    setTrendingOffset((prev) => Math.max(0, prev - 5));
  };

  const [newReleasePages, setNewReleasePages] = useState([1]);

  const newReleaseQueries = useQueries({
    queries: newReleasePages.map((page) => ({
      queryKey: ['movies', 'now-playing', page],
      queryFn: () => movieService.getNowPlayingMovies(page),
    })),
  });

  const allNewRelease = useMemo(
    () => newReleaseQueries.flatMap((q) => q.data?.results ?? []),
    [newReleaseQueries]
  );
  const isNewReleaseLoading = newReleaseQueries[0]?.isLoading ?? true;
  const isNewReleaseFetching = newReleaseQueries.some((q) => q.isFetching);
  const newReleaseTotalPages = newReleaseQueries.at(-1)?.data?.total_pages ?? 1;

  // ===== HERO =====
  const heroMovie = allTrending[0];
  const { data: heroVideos } = useMovieVideos(heroMovie?.id);
  const trailer = heroVideos?.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative w-full h-[560px] sm:h-screen sm:min-h-[600px] overflow-hidden">
        {heroMovie && (
          <>
            <img
              src={getImageUrl(heroMovie.backdrop_path, 'original')}
              alt={heroMovie.title}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 px-2xl md:px-11xl pb-[clamp(64px,10vw,140px)]">
              <div className="max-w-xl md:max-w-[660px] flex flex-col gap-lg md:gap-xl">
                <div>
                  <h1 className="text-display-xs md:text-display-lg lg:text-display-xl xl:text-display-2xl font-bold mb-2 md:mb-4 text-gray-25">
                    {heroMovie.title}
                  </h1>
                  <p className="text-sm lg:text-[15px] xl:text-md font-regular text-gray-400 line-clamp-3 md:line-clamp-none max-w-none md:max-w-[620px]">
                    {heroMovie.overview}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-md md:gap-xl">
                  {trailer && (
                    <Button asChild className="w-full rounded-full text-sm lg:text-[15px] xl:text-md py-2.5 md:py-3">
                      <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer">
                        Watch Trailer
                        <img src={playIcon} alt="" className="w-5 h-5 xl:w-6 xl:h-6" />
                      </a>
                    </Button>
                  )}

                  <Button asChild variant="secondary" className="w-full rounded-full text-sm lg:text-[15px] xl:text-md py-2.5 md:py-3">
                    <Link to={`/movie/${heroMovie.id}`}>See Detail</Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <main>
        {/* ================= TRENDING NOW ================= */}
        <section className="bg-black px-2xl md:px-11xl py-6xl">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="text-display-xs md:text-display-sm lg:text-display-md xl:text-display-lg font-bold text-gray-25 mb-5xl">
              Trending Now
            </h2>

            <div className="flex items-center gap-md">
              <button
                onClick={handleTrendingPrev}
                disabled={!canGoPrevTrending}
                aria-label="Film sebelumnya"
                className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-gray-900 items-center justify-center text-gray-25 hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <img src={arrowIcon} alt="" className="w-7 h-7 rotate-180" />
              </button>

              <div className="flex-1">
                <MovieGrid movies={visibleTrending} isLoading={isTrendingLoading} variant="trending" showRank />
              </div>

              <button
                onClick={handleTrendingNext}
                disabled={!canGoNextTrending || isTrendingFetching}
                aria-label="Film berikutnya"
                className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-gray-900 items-center justify-center text-gray-25 hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <img src={arrowIcon} alt="" className="w-7 h-7" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= NEW RELEASE ================= */}
        <section id="new-release" className="relative px-2xl md:px-11xl py-6xl">
          <h2 className="text-display-xs md:text-display-sm lg:text-display-md xl:text-display-lg font-bold text-gray-25 mb-5xl">
            New Release
          </h2>

          <MovieGrid movies={allNewRelease} isLoading={isNewReleaseLoading} variant="new-release" />

          {newReleasePages.length < newReleaseTotalPages && (
            <div className="flex justify-center mt-6xl">
              <Button
                onClick={() => setNewReleasePages((prev) => [...prev, prev.length + 1])}
                disabled={isNewReleaseFetching}
                variant="secondary"
                className="w-[200px] h-[44px] text-sm lg:text-[15px] xl:text-md"
              >
                {isNewReleaseFetching ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}