import { AnimatePresence, motion } from 'framer-motion';
import { useMovieStore } from '@/store/movieStore';
import SuccessIcon from '@/assets/icons/Logo Success Favorites.svg';

export function Toast() {
  const toastMessage = useMovieStore((s) => s.toastMessage);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-50 flex justify-center px-2xl">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20, mass: 0.8 }}
            className="flex items-center gap-lg rounded-2xl bg-black/25 backdrop-blur-lg px-3xl py-sm text-md text-white font-semibold w-full max-w-[531px] justify-center"
          >
            <img src={SuccessIcon} alt="Success Icon" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}