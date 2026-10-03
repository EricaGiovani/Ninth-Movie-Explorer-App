import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
}: EmptyStateProps) {

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[420px] md:min-h-[520px]">
      <img src={icon} alt="" className="w-[160px] md:w-[200px]"/>
      <p className="mt-lg text-md font-semibold text-white">{title}</p>

      <p className="mt-xs text-sm font-regular text-gray-400">{description}</p>

      {actionLabel && actionTo && (
        <Button asChild className="mt-3xl w-[200px] rounded-full px-6 py-2.5 text-sm font-semibold text-gray-25 hover:bg-primary-400 md:w-[300px] md:py-3 md:text-md">
          <Link to={actionTo}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}