import logoMovie from '@/assets/icons/Logo movie.svg';

export function Footer() {
  return (
    <footer className="h-[120px] bg-black border border-gray-800 gap-md py-3xl px-xl xl:py-md xl:px-11xl xl:flex xl:items-center xl:justify-between">
      <div className="gap-xs xl:gap-[7.11px] flex items-center">
        <img src={logoMovie} alt="Icon Movie" className="xl:w-10 xl:h-10 w-7 h-7" />
        <p className="text-gray-25 font-semibold text-[19.91px] xl:text-[28.44px] lg:text-display-xs">
          Movie
        </p>
      </div>
      <p className="font-regular xl:text-md lg:text-[15px] text-sm text-gray-600">
        Copyright ©2025 Movie Explorer
      </p>
    </footer>
  );
}