import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: Add utility functions for image URLs
// Hint: TMDB returns relative paths, you need to construct full image URLs
// Reference: https://developer.themoviedb.org/docs/image-basics

// Build a complete TMDB image URL from a relative image path
export function getImageUrl(path: string | null, size: string = 'original'): string {
  // Implement image URL construction
  // Use VITE_TMDB_IMAGE_BASE_URL from environment variables
  if (!path) return '/placeholder.jpg';
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// Format movie data for display
export function formatDate(dateString: string): string {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Format movie rating for display
export function formatRating(vote: number): string {
  return vote.toFixed(1);
}
