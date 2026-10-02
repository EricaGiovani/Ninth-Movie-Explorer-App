import { Link } from 'react-router-dom';
import { getImageUrl, formatRating } from '@/lib/utils';
import type { Movie, MovieDetails } from '@/types/movie';
import playIcon from '@/assets/icons/Logo Play.svg';
import starIcon from '@/assets/icons/Icon Star.svg';

interface MovieListItemProps {
  movie: Movie | MovieDetails;
  rightAction?: React.ReactNode; 
}

export function MovieListItem({ movie, rightAction }: MovieListItemProps) {
  return (
    <article className="relative grid grid-cols-[105px_1fr] md:grid-cols-[188px_1fr] md:grid-rows-[auto_1fr] gap-x-lg md:gap-x-4xl gap-y-lg items-start border-b border-gray-800 pb-3xl md:pb-4xl">
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
        {rightAction}
      </div>
    </article>
  );
}