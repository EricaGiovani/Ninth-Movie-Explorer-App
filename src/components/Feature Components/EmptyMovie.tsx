import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[420px] md:min-h-[520px]">
      <img src={icon} alt="" className="w-[160px] md:w-[200px]" />
      <p className="mt-lg text-md font-semibold text-white">{title}</p>
      <p className="mt-xs text-sm font-regular text-gray-400">{description}</p>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-3xl flex w-[200px] md:w-[300px] items-center justify-center rounded-full bg-primary-300 hover:bg-primary-400 transition-colors px-6 py-2.5 md:py-3 text-sm md:text-md font-semibold text-gray-25"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}