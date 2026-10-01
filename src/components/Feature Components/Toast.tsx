import { useMovieStore } from '@/store/movieStore';
import IconSuccess from '@/assets/icons/Logo Success Favorites.svg';

export function Toast() {
  const toastMessage = useMovieStore((s) => s.toastMessage);

  if (!toastMessage) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-50 flex justify-center px-2xl">
      <div className="flex items-center gap-lg rounded-2xl border border-white/25 bg-white/25 backdrop-blur-md px-xl py-md text-md font-medium text-white">
        <img src={IconSuccess} alt="Success Icon" className="w-5 h-5" />
        {toastMessage}
      </div>
    </div>
  );
}