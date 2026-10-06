import logoMovie from '@/assets/icons/Logo movie.svg';
import { NewsletterForm } from '@/components/Feature Components/NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 px-xl xl:px-11xl py-3xl xl:py-6xl">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4xl">
        <div className="gap-xs xl:gap-[7.11px] flex items-center shrink-0">
          <img src={logoMovie} alt="Icon Movie" className="xl:w-10 xl:h-10 w-7 h-7" />
          <p className="text-gray-25 font-semibold text-[19.91px] xl:text-[28.44px] lg:text-display-xs">
            Movie
          </p>
        </div>
        <NewsletterForm />
      </div>

      <p className="mt-4xl font-regular xl:text-md lg:text-[15px] text-sm text-gray-600">
        Copyright ©2025 Movie Explorer
      </p>
    </footer>
  );
}