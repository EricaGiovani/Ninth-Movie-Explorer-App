import { useMovieStore } from '@/store/movieStore';
import { MovieListItem } from '@/components/Feature Components/MovieListItem';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/Feature Components/EmptyMovie';
import heartFillIcon from '@/assets/icons/Logo Red Heart.svg';
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
        <EmptyState
          icon={emptyIcon}
          title="Data Empty"
          description="You don't have a favorite movie yet"
          actionLabel="Explore Movie"
          actionTo="/"/>
      ) : (
        <div className="mt-5xl md:mt-6xl space-y-4xl md:space-y-6xl">
          {favorites.map((movie) => (
            <MovieListItem
              key={movie.id}
              movie={movie}
              rightAction={
              <Button
                onClick={() => removeFromFavorites(movie.id)}
                aria-label="Hapus dari favorit"
                variant="secondary"
                size="icon"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-900 bg-gray-950/60 backdrop-blur-sm hover:bg-gray-900 transition-colors md:absolute md:top-0 md:right-0">
                  <img src={heartFillIcon} alt="" className="w-6 h-6" />
              </Button>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}