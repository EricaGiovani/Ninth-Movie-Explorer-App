import { z } from 'zod';

export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, 'Type at least 1 character')
    .max(100, 'Search is too long'),
});

export type SearchFormValues = z.infer<typeof searchSchema>;