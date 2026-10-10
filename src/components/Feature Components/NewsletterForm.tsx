import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/store/movieStore';
import { newsletterSchema, type NewsletterFormValues } from '@/lib/validations/newsletter';

export function NewsletterForm() {
  const showToast = useMovieStore((s) => s.showToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    showToast(`Subscribed: ${values.email}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-auto md:min-w-[400px]">
      <p className="text-sm font-semibold text-gray-25">Stay updated</p>
      <p className="mt-xxs text-xs text-gray-400">Get notified about new releases.</p>

      <div className="mt-lg flex items-center gap-md">
        <Input
          type="email"
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          className="newsletter-email flex-1 bg-gray-950 border border-gray-800 text-sm text-white placeholder:text-gray-500"
          {...register('email')}/>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full px-5 py-2.5 text-sm font-semibold">
          {isSubmitting ? '...' : 'Subscribe'}
        </Button>
      </div>

      {errors.email && <p className="mt-xs text-xs text-red-500">{errors.email.message}</p>}
    </form>
  );
}