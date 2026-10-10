import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, type SearchFormValues } from '@/lib/validations/search';
import logoMovie from '@/assets/icons/Logo movie.svg';
import searchIcon from '@/assets/icons/Logo Search.svg';
import searchIconBold from '@/assets/icons/Logo Search Bold.svg';
import HamburgerIcon from '@/assets/icons/Hamburger icon.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isSearchPage = location.pathname === '/search';
  const urlQuery = isSearchPage ? (searchParams.get('q') ?? '') : '';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    values: { query: urlQuery }, 
  });

  const currentQuery = useWatch({ control, name: 'query' });

  const onSubmitSearch = (values: SearchFormValues) => {
    navigate(`/search?q=${encodeURIComponent(values.query)}`, { replace: isSearchPage });
  };

  const handleClear = () => {
  reset({ query: '' });
  navigate('/', { replace: true });
};

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-md font-regular transition-colors hover:text-primary-300 ${
      isActive ? 'text-primary-300' : 'text-white'
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/60 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-2xl md:px-11xl py-lg md:py-2xl">
          <div className="gap-8xl flex items-center">
            <Link to="/" className="flex items-center gap-[7.11px]">
              <img src={logoMovie} alt="Movie Logo" className="w-7 h-7 xl:w-10 xl:h-10" />
              <span className="text-lg md:text-xl lg:text-display-xs xl:text-display-sm font-semibold text-gray-25">
                Movie
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-6xl">
              <NavLink to="/" end className={navLinkClass}>Home</NavLink>
              <NavLink to="/favorites" className={navLinkClass}>Favorites</NavLink>
            </div>
          </div>

          {/* Search Desktop */}
          <div className="hidden md:flex flex-col">
            <form
              onSubmit={handleSubmit(onSubmitSearch)}
              className="relative flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-2xl px-xl py-md w-64">
              <img src={searchIcon} alt="Search icon" className="w-6 h-6 shrink-0" />
              <Input
                type="text"
                placeholder="Search Movie"
                aria-invalid={!!errors.query}
                className="movie-search-input min-w-0 flex-1 border-0 bg-transparent px-0 text-md font-regular text-white shadow-none placeholder:text-gray-400 focus-visible:ring-0"
              {...register('query')}/>
              {currentQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Hapus pencarian"
                  className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-700 text-xs leading-none text-gray-25 hover:bg-gray-600">
                  ✕
                </button>
              )}
            </form>
            {errors.query && (
              <p className="mt-xs text-xs text-red-500">{errors.query.message}</p>
            )}
          </div>

          <div className="flex items-center gap-3xl lg:hidden">
            <Link to="/search" aria-label="Buka pencarian" className="flex md:hidden h-6 w-6 items-center justify-center">
              <img src={searchIconBold} alt="Search" className="w-6 h-6" />
            </Link>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Buka menu"
              onClick={() => setIsMenuOpen(true)}
              className="flex lg:hidden h-10 w-10 text-white hover:bg-transparent"
            >
              <img src={HamburgerIcon} alt="Menu" className="w-6 h-6" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-0 z-[60] bg-gray-950 transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-2xl h-16 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <img src={logoMovie} alt="Movie Logo" className="w-7 h-7" />
            <span className="font-semibold text-xl text-gray-25">Movie</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Tutup menu"
            onClick={() => setIsMenuOpen(false)}
            className="text-display-xs leading-none text-white hover:bg-transparent"
          >
            ✕
          </Button>
        </div>

        <ul className="flex flex-col gap-3xl px-3xl py-3xl text-white">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-300 gap-md font-regular text-md">Home</Link></li>
          <li><Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="hover:text-primary-300 gap-md font-regular text-md">Favorites</Link></li>
        </ul>
      </div>
    </>
  );
}