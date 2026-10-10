# Assignment Checklist

Gunakan checklist ini untuk memastikan semua requirement sudah terpenuhi.

## Setup & Configuration

- [done] Install semua dependencies
- [done] Setup environment variables (.env)
- [done] TMDB API key berfungsi
- [done] Development server berjalan tanpa error
- [done] Path aliases (`@/...`) berfungsi

## Tech Stack Implementation

### React Query

- [done] QueryClient configured dengan proper options
- [done] useQuery untuk data fetching
- [done] Loading states handled
- [done] Error states handled
- [done] Data caching berfungsi dengan baik
- [done] React Query Devtools digunakan untuk debugging

### Zustand

- [done] Store created untuk favorites/watchlist
- [done] Actions implemented (add, remove, toggle)
- [done] State persist ke localStorage
- [done] Store properly typed dengan TypeScript

### React Router

- [done] Router setup di App.tsx
- [done] Routes configured (Home, Detail, dll)
- [done] Navigation berfungsi
- [done] 404/Not Found page (optional)
- [done] URL params untuk detail page

### Radix UI & shadcn/ui

- [done] components.json configured
- [done] Install komponen yang dibutuhkan
- [done] Komponen properly customized
- [done] Accessible (keyboard navigation works)

### Zod & React Hook Form

- [done] Form validation schema dengan Zod
- [done] useForm hook implementation
- [done] Error messages displayed
- [done] Form submission handled

### Framer Motion

- [done] Page transitions
- [done] Component animations (fade in, slide, etc.)
- [done] Hover effects
- [done] Loading animations
- [done] Tidak over-animate (subtle & meaningful)

## Features

### Home Page

- [done] Display popular movies
- [done] Display now playing movies (or other category)
- [done] Search bar functional
- [done] Search results displayed
- [done] Filter/sorting options (optional)
- [done] Responsive layout

### Movie Detail Page

- [done] Movie poster displayed
- [done] Movie title & overview
- [done] Rating, release date, runtime
  //untuk runtime tidak saya membuatnya dikarenakan menyesuaikan desain figma yang menggunakan age card,bukan runtime.
- [done] Genres displayed
- [done] Cast & crew information
- [done] Similar movies recommendations
- [done] Add to favorites/watchlist button
- [done] Back to home navigation
- [done] Responsive layout

### Favorites/Watchlist

- [done] Add movie to favorites
- [done] Remove movie from favorites
- [done] Favorites persist after page refresh
- [done] Visual indicator (heart icon, etc.)
- [done] Count badge (optional)

## Code Quality

### TypeScript

- [done] Proper interfaces/types defined
- [done] No `any` types (except when absolutely necessary)
- [done] Types exported and reused
- [done] Type-safe API responses

### Code Organization

- [done] Components modular dan reusable
- [done] Proper folder structure
- [done] Separation of concerns
- [done] No duplicate code
- [done] Meaningful variable/function names

### Best Practices

- [done] No console.logs in production code
- [ ] Error boundaries (optional but good)
- [done] Loading states consistent
- [done] Environment variables used properly
- [done] Comments untuk code yang kompleks

## UI/UX

### Design Implementation

- [done] Mengikuti design Figma
- [done] Color scheme consistent
- [done] Typography consistent
- [done] Spacing & layout sesuai
- [done] Images loaded properly

### Responsive Design

- [done] Mobile (< 768px)
- [done] Desktop (>= 768px)
- [done] No horizontal scroll
- [done] Touch-friendly pada mobile

### User Experience

- [done] Navigation intuitif
- [done] Loading feedback jelas
- [done] Error messages helpful
- [done] Smooth animations
- [done] No janky interactions

## Testing & Quality Assurance

- [done] Test di berbagai ukuran layar
- [done] Test di browser berbeda (Chrome, Firefox, Safari)
- [done] Test semua user flows
- [done] No console errors
- [done] No TypeScript errors
- [ ] Lighthouse score reasonable (optional)

## Git & Documentation

- [done] Meaningful commit messages
- [done] Commits organized logically
- [done] README updated (jika ada perubahan setup)
- [done] Remove unnecessary comments
- [done] Code formatted consistently

## Bonus Points

- [done] Deployed ke Vercel/Netlify
- [ ] Dark mode implementation
- [ ] Skeleton loading states
- [done] Infinite scroll / pagination
- [done] Advanced animations
- [ ] Unit tests (optional)
- [ ] E2E tests (optional)

## Final Check

- [done] Run `npm run build` - build berhasil tanpa error
- [done] Run `npm run lint` - no linting errors
- [done] Test deployed version (jika sudah deploy)
- [done] Review semua code sekali lagi
- [done] Ensure no sensitive data in repo

---

**Score yourself honestly and identify areas for improvement!**

Good luck!
