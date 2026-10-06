import { MovieCard } from './MovieCard';
import { motion } from 'framer-motion';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  showRank?: boolean;
  rankStart?: number;
  variant?: 'trending' | 'new-release' | 'similar';
}

const gridClasses = {
  trending: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-xl xl:gap-2xl',
  'new-release': 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-lg md:gap-xl lg:gap-2xl gap-y-6xl gap-x-2xl',
  similar:'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-xl xl:gap-2xl',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function MovieGrid({
  movies,
  isLoading,
  showRank = false,
  rankStart = 0,
  variant = 'new-release',
}: MovieGridProps) {
  const gridClass = gridClasses[variant];

  if (isLoading) {
    return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="flex items-center">
        <p className="text-md font-medium text-gray-400">
          Loading
        </p>

        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: dot * 0.2,
              ease: 'easeInOut',
            }}
            className="text-md font-medium text-gray-400">
            .
          </motion.span>
        ))}
      </div>
    </div>
  );
  }

  if (movies.length === 0) {
    return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 py-6xl text-center">
      <p className="text-sm md:text-md xl:text-lg font-semibold text-gray-25">
        Data Not Found
      </p>
      <p className="mt-xs text-xs md:text-sm xl:text-md text-gray-400">
        Try other keywords
      </p>
    </motion.div>
  );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className={`grid ${gridClass}`}>
      {movies.map((movie, index) => (
        <motion.div key={movie.id} variants={item}>
          <MovieCard movie={movie} rank={showRank ? rankStart + index + 1 : undefined} />
        </motion.div>
      ))}
    </motion.div>
  );
}