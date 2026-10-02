import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout Components/Layout';
import { HomePage } from '@/pages/HomePage';
import { MovieDetailPage } from '@/pages/MovieDetailPage';
import { FavoritesPage } from '@/pages/FavoritesPages';
import { SearchPage } from '@/pages/SearchPages';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;