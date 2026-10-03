// components/Feature Components/MovieGrid.tsx
import { MovieCard } from './MovieCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  showRank?: boolean;
  rankStart?: number;
  variant?: 'trending' | 'new-release';
}

const gridClasses = {
  trending: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-xl xl:gap-2xl',
  'new-release': 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-lg md:gap-xl lg:gap-2xl gap-y-6xl gap-x-2xl',
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
      <div className={`grid ${gridClass}`}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-md">
            <Skeleton className="aspect-[2/3] w-full rounded-xl bg-gray-900" />
            <Skeleton className="h-4 w-3/4 bg-gray-900" />
            <Skeleton className="h-3 w-1/3 bg-gray-900" />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 py-6xl text-center">
        <p className="text-sm md:text-md xl:text-lg font-semibold text-gray-25">Data Not Found</p>
        <p className="mt-xs text-xs md:text-sm xl:text-md text-gray-400">Try other keywords</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClass}`}>
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} rank={showRank ? rankStart + index + 1 : undefined} />
      ))}
    </div>
  );
}