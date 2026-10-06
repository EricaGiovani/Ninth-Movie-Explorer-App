import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toast } from '@/components/Feature Components/Toast';

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <Toast />
      {/*Animate page transitions when the route changes*/}
      <AnimatePresence initial={false}>
        <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        className="flex-1">
        <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}