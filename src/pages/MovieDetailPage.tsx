import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMovieDetails, useMovieCredits, useMovieVideos } from '@/hooks/useMovies';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl, formatDate, formatRating } from '@/lib/utils';
import playIcon from '@/assets/icons/Logo Play.svg';
import heartIcon from '@/assets/icons/Logo heart.svg';
import calendarIcon from '@/assets/icons/Logo Calender.svg';
import starIcon from '@/assets/icons/Icon Star.svg';
import videoIcon from '@/assets/icons/Logo Video.svg';

export function MovieDetailPage() {
  const { id } = useParams();
  const movieId = Number(id);

  const { data: movie, isLoading } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);

  const toggleFavorite = useMovieStore((s) => s.toggleFavorite);
  const isFavorite = useMovieStore((s) => (movie ? s.isFavorite(movie.id) : false));

  const trailer = videos?.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');
  const topCast = credits?.cast.slice(0, 6) ?? [];

  if (isLoading) {
    return <div className="pt-32 px-2xl text-white">Loading...</div>;
  }

  if (!movie) {
    return <div className="pt-32 px-2xl text-white">Movie not found.</div>;
  }

  return (
    <section className="relative w-full bg-black">
      {/* Backdrop */}
      <div className="absolute inset-x-0 top-0 h-[300px] md:h-[480px] xl:h-[640px] overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-[50%_10%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      </div>

      {/* Konten */}
      <div className="relative z-10 px-2xl md:px-11xl pt-[190px] md:pt-[240px] lg:pt-[300px] xl:pt-[400px] pb-8xl md:pb-10xl">

        {/* Poster + info */}
        <div className="grid grid-cols-[116px_1fr] md:grid-cols-[200px_1fr] xl:grid-cols-[256px_1fr] md:grid-rows-[auto_auto_1fr] gap-x-lg md:gap-x-4xl gap-y-xl items-start">

          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={`Poster ${movie.title}`}
            className="col-start-1 row-start-1 md:row-span-3 w-full aspect-[2/3] object-cover rounded-xl"
          />

          <div className="col-start-2 row-start-1 min-w-0">
            <h1 className="text-xl md:text-display-sm xl:text-display-xl font-bold text-gray-25">
              {movie.title}
            </h1>
            <div className="flex items-center gap-md mt-xs md:mt-2xl">
              <img src={calendarIcon} alt="" className="w-5 h-5 xl:w-6 xl:h-6" />
              <span className="text-sm md:text-[15px] xl:text-md font-regular text-white">
                {formatDate(movie.release_date)}
              </span>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 md:col-start-2 row-start-2 flex items-center gap-xl mt-xs md:mt-md">
            {trailer && (
              <Button asChild className="flex-1 md:flex-none md:w-[230px] text-sm md:text-[15px] xl:text-md">
                <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer">Watch Trailer
                  <img src={playIcon} alt="" className="w-4 h-4 xl:w-6 xl:h-6" />
                </a>
              </Button>
            )}
            <Button
            onClick={() => toggleFavorite(movie)}
            aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            aria-pressed={isFavorite}
            variant="secondary"
            size="icon"
            className="h-11 w-11 rounded-full bg-gray-950/60 backdrop-blur-sm hover:bg-gray-900"
            >
            <img src={heartIcon} alt="" className={`w-6 h-6 ${isFavorite ? 'opacity-100' : 'opacity-60'}`} />
            </Button>
          </div>

          <div className="col-span-2 md:col-span-1 md:col-start-2 row-start-3 md:self-end grid grid-cols-2 gap-lg md:gap-2xl xl:mb-3xl">
            <div className="flex flex-col items-center justify-center gap-md rounded-2xl border border-gray-800 bg-black p-xl md:p-2xl">
              <img src={starIcon} alt="" className="w-6 h-6 xl:w-8 xl:h-8" />
              <p className="text-xs md:text-sm xl:text-md text-gray-300 font-regular">Rating</p>
              <p className="text-lg md:text-[19px] xl:text-xl font-semibold text-gray-25">
                {formatRating(movie.vote_average)}/10
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-md rounded-2xl border border-gray-800 bg-black p-xl md:p-2xl">
              <img src={videoIcon} alt="" className="w-6 h-6 xl:w-8 xl:h-8" />
              <p className="text-xs md:text-sm xl:text-md text-gray-300 font-regular">Genre</p>
              <p className="text-lg md:text-[19px] xl:text-xl font-semibold text-gray-25 line-clamp-1">
                {movie.genres[0]?.name ?? '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mt-4xl md:mt-7xl">
          <p className="text-xl md:text-display-xs lg:text-display-sm xl:text-display-md font-bold text-gray-25">
            Overview
          </p>
          <p className="mt-md text-sm xl:text-md font-regular text-gray-400">
            {movie.overview}
          </p>
        </div>

        {/* Cast & Crew */}
        {topCast.length > 0 && (
          <div className="mt-4xl md:mt-7xl">
            <h2 className="text-xl md:text-display-xs lg:text-display-sm xl:text-display-md font-bold text-gray-25">
              Cast &amp; Crew
            </h2>

            <div className="mt-3xl md:mt-4xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4xl gap-y-3xl">
              {topCast.map((person) => (
                <div key={person.id} className="flex items-center gap-lg">
                  <img
                    src={getImageUrl(person.profile_path, 'w185')}
                    alt={person.name}
                    className="w-[55px] h-[84px] xl:w-[69px] xl:h-[104px] shrink-0 rounded-md xl:rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm md:text-[15px] xl:text-md font-semibold text-gray-25">
                      {person.name}
                    </p>
                    <p className="text-sm md:text-[15px] xl:text-md text-gray-400 font-regular">
                      {person.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}