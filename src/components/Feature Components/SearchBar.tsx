import { useNavigate } from 'react-router-dom';
import arrowLeftIcon from '@/assets/icons/Logo Arrow Left.svg';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-900">
      <div className="flex items-center gap-lg px-2xl md:px-11xl py-lg md:py-xl">
        <button
          type="button"
          aria-label="Kembali"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center"
        >
          <img src={arrowLeftIcon} alt="" className="w-6 h-6" />
        </button>

        <div className="flex flex-1 items-center gap-2 bg-gray-950 border border-gray-800 rounded-2xl px-xl py-md">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search Movie"
            autoFocus
            className="border-0 bg-transparent px-0 text-sm md:text-md text-white shadow-none placeholder:text-gray-400 focus-visible:ring-0"
          />
        </div>
      </div>
    </header>
  );
}