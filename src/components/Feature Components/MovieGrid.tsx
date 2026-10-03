import { MovieCard } from './MovieCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  showRank?: boolean;
  variant?: 'trending' | 'new-release';
}

export function MovieGrid({
  movies,
  isLoading,
  showRank = false,
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-xl">
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
        <p className="text-sm md:text-md xl:text-lg font-semibold text-gray-25">
          Data Not Found
        </p>

        <p className="mt-xs text-xs md:text-sm xl:text-md text-gray-400">
          Try other keywords
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-xl">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          rank={showRank ? index + 1 : undefined}
        />
      ))}
    </div>
  );
}