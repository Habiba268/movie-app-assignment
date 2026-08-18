import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovies, type Movie } from './tmdb';
import { auth } from './firebase';
import { addToWatchlist } from './watchlistService';
import { MovieModal } from './MovieModal';
import type { User } from 'firebase/auth';

export const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchPopularMovies().then(setMovies).catch(console.error);
    const unsubscribe = auth.onAuthStateChanged((currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>🎬 Explore Movies</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Search for a movie..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div 
              onClick={() => setSelectedMovie(movie)} 
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'} 
                alt={movie.title} 
                style={{ width: '100%', borderRadius: '6px' }} 
              />
              <h4 style={{ margin: '10px 0 5px' }}>{movie.title}</h4>
              <p style={{ margin: '0 0 10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
              </p>
            </div>

            {user && (
              <button 
                onClick={() => addToWatchlist(user.uid, movie)} 
                className="btn-primary"
                style={{ marginTop: '10px', width: '100%' }}
              >
                + Watchlist
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Details Modal */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
};