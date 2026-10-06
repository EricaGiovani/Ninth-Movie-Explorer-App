import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import starIcon from '@/assets/icons/Icon Star.svg';
import { getImageUrl, formatRating } from '@/lib/utils';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

export function MovieCard({ movie, rank }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div whileHover={{ y: -7 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative overflow-hidden rounded-xl">
          {rank !== undefined && (
            <span className="absolute top-md left-md z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-950/60 text-sm lg:text-md xl:text-lg font-semibold text-gray-25 backdrop-blur-md">
              {rank}
            </span>
          )}
          {posterUrl && !imageError ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-gray-900">
              <p className="px-md text-center text-sm text-gray-400">
                Poster Not Available
              </p>
            </div>
          )}
        </div>

        <div className="mt-md gap-xxs">
          <h3 className="text-md lg:text-[15px] xl:text-lg font-semibold text-gray-25 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center gap-xs">
            <img src={starIcon} alt="" className="w-5 h-5" />
            <p className="text-sm font-regular lg:text-[15px] xl:text-md text-gray-400">
              {formatRating(movie.vote_average)}/10
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}