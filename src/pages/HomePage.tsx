import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import { useMovieVideos } from '@/hooks/useMovies';
import { MovieGrid } from '@/components/Feature Components/MovieGrid';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils';
import playIcon from '@/assets/icons/Logo Play.svg';
import arrowIcon from '@/assets/icons/Logo Arrow.svg';

export function HomePage() {
  // ===== DEVICE TYPE =====
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateDeviceType = () => {
      if (window.innerWidth < 768) setDeviceType('mobile');
      else if (window.innerWidth < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

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

  const trendingWindowSize = { mobile: 2, tablet: 3, desktop: 5 }[deviceType];

  const visibleTrending = allTrending.slice(trendingOffset, trendingOffset + trendingWindowSize);
  const canGoPrevTrending = trendingOffset > 0;
  const canGoNextTrending =
    trendingOffset + trendingWindowSize < allTrending.length || trendingPages.length < trendingTotalPages;

  const handleTrendingNext = () => {
    const nextOffset = trendingOffset + trendingWindowSize;
    if (nextOffset + trendingWindowSize > allTrending.length && trendingPages.length < trendingTotalPages) {
      setTrendingPages((prev) => [...prev, prev.length + 1]);
    }
    setTrendingOffset(nextOffset);
  };

  const handleTrendingPrev = () => {
    setTrendingOffset((prev) => Math.max(0, prev - trendingWindowSize));
  };

  // ===== NEW RELEASE =====
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

  const moviesPerPage = { mobile: 8, tablet: 12, desktop: 15 }[deviceType];
  const newReleaseLimit = newReleasePages.length * moviesPerPage;
  const visibleNewRelease = allNewRelease.slice(0, newReleaseLimit);

  const isNewReleaseLoading = newReleaseQueries[0]?.isLoading ?? true;
  const isNewReleaseFetching = newReleaseQueries.some((q) => q.isFetching);
  const newReleaseTotalPages = newReleaseQueries.at(-1)?.data?.total_pages ?? 1;

  const handleNewReleaseLoadMore = () => {
    if (newReleasePages.length < newReleaseTotalPages) {
      setNewReleasePages((prev) => [...prev, prev.length + 1]);
    }
  };

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
              <div className="w-full max-w-full md:max-w-[660px] flex flex-col gap-lg md:gap-xl">
                <div>
                  <h1 className="text-display-xs md:text-display-lg lg:text-display-xl xl:text-display-2xl font-bold mb-2 md:mb-4 text-gray-25">
                    {heroMovie.title}
                  </h1>
                  <p className="w-full max-w-full md:max-w-[620px] text-sm lg:text-[15px] xl:text-md font-regular text-gray-400">
                    {heroMovie.overview}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-md md:gap-xl xl:w-[476px] xl:h-[52px]">
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

            <div className="relative">
              {/* Previous — kiri */}
              <button
                onClick={handleTrendingPrev}
                disabled={!canGoPrevTrending}
                aria-label="Film sebelumnya"
                className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1/2 z-20 flex w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-900 items-center justify-center text-gray-25 hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <img src={arrowIcon} alt="" className="w-5 h-5 md:w-7 md:h-7 rotate-180" />
              </button>

              {/* Movies */}
              <div className="px-10 md:px-12">
                <MovieGrid
                  movies={visibleTrending}
                  isLoading={isTrendingLoading}
                  variant="trending"
                  showRank
                  rankStart={trendingOffset}
                />
              </div>

              {/* Next — kanan */}
              <button
                onClick={handleTrendingNext}
                disabled={!canGoNextTrending || isTrendingFetching}
                aria-label="Film berikutnya"
                className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/2 z-20 flex w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-900 items-center justify-center text-gray-25 hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <img src={arrowIcon} alt="" className="w-5 h-5 md:w-7 md:h-7" />
              </button>
            </div>
          </div>
        </section>

        {/* ================= NEW RELEASE ================= */}
        <section id="new-release" className="relative px-2xl md:px-11xl py-6xl">
          <h2 className="text-display-xs md:text-display-sm lg:text-display-md xl:text-display-lg font-bold text-gray-25 mb-5xl">
            New Release
          </h2>

          <MovieGrid movies={visibleNewRelease} isLoading={isNewReleaseLoading} variant="new-release" />

          {newReleasePages.length < newReleaseTotalPages && (
            <div className="relative z-20 flex justify-center -translate-y-9">
              <Button
                onClick={handleNewReleaseLoadMore}
                disabled={isNewReleaseFetching}
                variant="secondary"
                className="w-[200px] h-[44px] xl:w-[230px] xl:h-[52px] rounded-full text-sm lg:text-[15px] xl:text-md"
              >
                {isNewReleaseFetching ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[600px] bg-gradient-to-b from-transparent via-black/80 to-black"></div>
        </section>
      </main>
    </div>
  );
}