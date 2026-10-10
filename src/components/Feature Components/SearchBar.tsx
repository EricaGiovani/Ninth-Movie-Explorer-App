import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import arrowLeftIcon from '@/assets/icons/Logo Arrow Left.svg';
import { Input } from '@/components/ui/input';
import { searchSchema, type SearchFormValues } from '@/lib/validations/search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
}

export function SearchBar({ value, onChange, onBack }: SearchBarProps) {
  const {
    register,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    mode: 'onChange',
    defaultValues: { query: value }, // hanya nilai awal saat komponen muncul
  });

  const { onChange: onFieldChange, ...field } = register('query');

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-900">
      <div className="flex items-center gap-lg px-2xl md:px-11xl py-lg md:py-xl">
        <button
          type="button"
          aria-label="Kembali"
          onClick={onBack}
          className="flex h-10 w-10 shrink-0 items-center justify-center"
        >
          <img src={arrowLeftIcon} alt="" className="w-6 h-6" />
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-2xl px-xl py-md">
            <Input
              type="text"
              placeholder="Search Movie"
              autoFocus
              aria-invalid={!!errors.query}
              className="border-0 bg-transparent px-0 text-sm md:text-md text-white shadow-none placeholder:text-gray-400 focus-visible:ring-0"
              {...field}
              onChange={(e) => {
                onFieldChange(e);          // validasi RHF + Zod tetap jalan
                onChange(e.target.value);  // lapor ke parent hanya saat user mengetik
              }}
            />
          </div>
          {errors.query && (
            <p className="mt-xs text-xs text-red-500">{errors.query.message}</p>
          )}
        </div>
      </div>
    </header>
  );
}