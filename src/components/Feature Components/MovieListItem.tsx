import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useMovieVideos } from '@/hooks/useMovies';
import { getImageUrl, formatRating } from '@/lib/utils';
import type { Movie, MovieDetails } from '@/types/movie';
import playIcon from '@/assets/icons/Logo Play.svg';
import starIcon from '@/assets/icons/Icon Star.svg';

interface MovieListItemProps {
  movie: Movie | MovieDetails;
  rightAction?: ReactNode;
}

export function MovieListItem({ movie, rightAction }: MovieListItemProps) {
  const [imageError, setImageError] = useState(false);
  const { data: videos } = useMovieVideos(movie.id);
  const trailer = videos?.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
  const posterUrl = getImageUrl(movie.poster_path, 'w342');

  return (
    <article className="relative border-b border-gray-800 pb-3xl md:pb-4xl">
      <div className="flex gap-lg md:gap-4xl">
        <Link to={`/movie/${movie.id}`} className="shrink-0">
        {posterUrl && !imageError ? (
          <img
            src={getImageUrl(movie.poster_path, 'w342')}
            alt={`Poster ${movie.title}`}
            onError={() => setImageError(true)}
            className="w-[105px] md:w-[188px] aspect-[2/3] md:h-full object-cover rounded-md lg:rounded-xl"
          />
          ) : (
            <div className="flex w-[105px] md:w-[188px] aspect-[2/3] items-center justify-center rounded-md lg:rounded-xl bg-gray-900">
              <p className="px-md text-center text-xs md:text-sm text-gray-400">
                Poster Not Available
              </p>
            </div>
          )}
        </Link>
        
        <div className="min-w-0 flex-1 flex flex-col">
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

          <div className="hidden md:flex items-center gap-xl mt-md">
            {trailer && (
              <Button
                asChild
                className="w-[230px] rounded-full bg-primary-300 hover:bg-primary-400 transition-colors px-6 py-3 text-[15px] xl:text-md font-semibold text-gray-25"
              >
                <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer">
                  Watch Trailer
                  <img src={playIcon} alt="" className="w-6 h-6" />
                </a>
              </Button>
            )}
            {rightAction}
          </div>
        </div>
      </div>

      <div className="flex md:hidden items-center gap-xl mt-xl">
        {trailer && (
          <Button
            asChild
            className="flex-1 rounded-full bg-primary-300 hover:bg-primary-400 transition-colors px-5 py-2.5 text-sm font-semibold text-gray-25"
          >
            <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer">
              Watch Trailer
              <img src={playIcon} alt="" className="w-4 h-4" />
            </a>
          </Button>
        )}
        {rightAction}
      </div>
    </article>
  );
}