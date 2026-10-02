import { Link } from 'react-router-dom';
import { useState } from 'react';
import { usePopularMovies, useNowPlayingMovies, useMovieVideos } from '@/hooks/useMovies';
import { MovieGrid } from '@/components/Feature Components/MovieGrid';
import { getImageUrl } from '@/lib/utils';
import playIcon from '@/assets/icons/Logo Play.svg';

export function HomePage() {
  const [newReleasePage, setNewReleasePage] = useState(1);

  const { data: trendingData, isLoading: isTrendingLoading } = usePopularMovies(1);
  const { data: newReleaseData, isLoading: isNewReleaseLoading } = useNowPlayingMovies(newReleasePage);

  const heroMovie = trendingData?.results[0];
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
              className="absolute inset-0 w-full h-full object-cover"
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
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-md bg-primary-300 hover:bg-primary-400 transition-colors font-semibold text-gray-25 text-sm lg:text-[15px] xl:text-md px-5 md:px-6 py-2.5 md:py-3 rounded-full w-full justify-center"
                    >
                      Watch Trailer
                      <img src={playIcon} alt="" className="w-5 h-5 xl:w-6 xl:h-6" />
                    </a>
                  )}

                  <Link
                    to={`/movie/${heroMovie.id}`}
                    className="text-sm lg:text-[15px] xl:text-md font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-gray-900 hover:bg-white/10 transition-colors text-gray-25 w-full text-center"
                  >
                    See Detail
                  </Link>
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

            <MovieGrid
              movies={trendingData?.results.slice(0, 5) ?? []}
              isLoading={isTrendingLoading}
              showRank
            />
          </div>
        </section>

        {/* ================= NEW RELEASE ================= */}
        <section id="new-release" className="relative px-2xl md:px-11xl py-6xl">
          <h2 className="text-display-xs md:text-display-sm lg:text-display-md xl:text-display-lg font-bold text-gray-25 mb-5xl">
            New Release
          </h2>

          <MovieGrid
            movies={newReleaseData?.results ?? []}
            isLoading={isNewReleaseLoading}
          />

          {newReleaseData && newReleasePage < newReleaseData.total_pages && (
            <div className="flex justify-center mt-6xl">
              <button
                onClick={() => setNewReleasePage((p) => p + 1)}
                disabled={isNewReleaseLoading}
                className="bg-gray-950 border border-gray-900 text-white text-sm lg:text-[15px] xl:text-md font-semibold rounded-full w-[200px] h-[44px] disabled:opacity-50"
              >
                {isNewReleaseLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}