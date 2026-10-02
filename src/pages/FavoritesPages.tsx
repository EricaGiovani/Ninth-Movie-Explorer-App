import { Link } from 'react-router-dom';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl, formatRating } from '@/lib/utils';
import playIcon from '@/assets/icons/Logo Play.svg';
import heartFillIcon from '@/assets/icons/Logo Red Heart.svg';
import starIcon from '@/assets/icons/Icon Star.svg';
import emptyIcon from '@/assets/icons/Logo Frame.svg';

export function FavoritesPage() {
  const favorites = useMovieStore((s) => s.favorites);
  const removeFromFavorites = useMovieStore((s) => s.removeFromFavorites);

  return (
    <section className="px-2xl md:px-11xl pt-[100px] md:pt-[140px] xl:pt-[164px] pb-8xl md:pb-10xl min-h-[calc(100vh_-_120px)]">
      <h1 className="text-xl md:text-display-sm xl:text-display-lg font-bold text-gray-25">
        Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center min-h-[420px] md:min-h-[520px]">
          <img src={emptyIcon} alt="" className="w-[160px] md:w-[200px]" />
          <p className="mt-lg text-md font-semibold text-white">Data Empty</p>
          <p className="mt-xs text-sm font-regular text-gray-400">You don't have a favorite movie yet</p>
          <Link
            to="/"
            className="mt-3xl flex w-[200px] md:w-[300px] items-center justify-center rounded-full bg-primary-300 hover:bg-primary-400 transition-colors px-6 py-2.5 md:py-3 text-sm md:text-md font-semibold text-gray-25"
          >
            Explore Movie
          </Link>
        </div>
      ) : (
        <div className="mt-5xl md:mt-6xl space-y-4xl md:space-y-6xl">
          {favorites.map((movie) => (
            <article
              key={movie.id}
              className="relative grid grid-cols-[105px_1fr] md:grid-cols-[188px_1fr] md:grid-rows-[auto_1fr] gap-x-lg md:gap-x-4xl gap-y-lg items-start border-b border-gray-800 pb-3xl md:pb-4xl"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={getImageUrl(movie.poster_path, 'w342')}
                  alt={`Poster ${movie.title}`}
                  className="col-start-1 row-start-1 md:row-span-2 w-full aspect-[2/3] object-cover rounded-md lg:rounded-xl"
                />
              </Link>

              <div className="col-start-2 row-start-1 min-w-0 md:pr-6xl">
                <Link to={`/movie/${movie.id}`}>
                  <h2 className="text-md md:text-xl xl:text-display-xs font-bold text-gray-25">
                    {movie.title}
                  </h2>
                </Link>
                <div className="flex items-center gap-xs mt-xs">
                  <img src={starIcon} alt="" className="w-4 h-4 md:w-6 md:h-6" />
                  <span className="text-sm md:text-md xl:text-lg font-medium text-gray-25">
                    {formatRating(movie.vote_average)}/10
                  </span>
                </div>
                <p className="mt-xs md:mt-md text-sm md:text-[15px] xl:text-md text-gray-400 line-clamp-2">
                  {movie.overview}
                </p>
              </div>

              <div className="col-span-2 md:col-span-1 md:col-start-2 row-start-2 flex items-center gap-xl md:self-start">
                <Link
                  to={`/movie/${movie.id}`}
                  className="flex flex-1 md:flex-none md:w-[230px] items-center justify-center gap-md rounded-full bg-primary-300 hover:bg-primary-400 transition-colors p-md text-sm md:text-[15px] xl:text-md font-semibold text-gray-25"
                >
                  Watch Trailer
                  <img src={playIcon} alt="" className="w-4 h-4 xl:w-6 xl:h-6" />
                </Link>
                <button
                  onClick={() => removeFromFavorites(movie.id)}
                  aria-label="Hapus dari favorit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-900 bg-gray-950/60 backdrop-blur-sm hover:bg-gray-900 transition-colors md:absolute md:top-0 md:right-0"
                >
                  <img src={heartFillIcon} alt="" className="w-6 h-6" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}