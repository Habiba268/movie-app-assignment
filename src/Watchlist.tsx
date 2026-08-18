import React, { useEffect, useState } from 'react';
import { getUserWatchlist, removeFromWatchlist, type WatchlistItem } from './watchlistService';
import { auth } from './firebase';
import type { User } from 'firebase/auth';

export const Watchlist: React.FC = () => {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await getUserWatchlist(currentUser.uid);
        setItems(data);
      } else {
        setItems([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRemove = async (movieId: number) => {
    if (!user) return;
    await removeFromWatchlist(user.uid, movieId);
    setItems((prev) => prev.filter((item) => item.id !== movieId));
  };

  if (!user) {
    return <p style={{ marginTop: '20px' }}>Please log in to see your watchlist.</p>;
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>🔖 My Watchlist</h2>
      {items.length === 0 ? (
        <p>Your watchlist is currently empty.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
          {items.map((item) => (
            <div key={item.id} className="movie-card">
              <div>
                <img 
                  src={item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'} 
                  alt={item.title} 
                  style={{ width: '100%', borderRadius: '6px' }} 
                />
                <h4 style={{ margin: '10px 0 5px' }}>{item.title}</h4>
                <p style={{ margin: '0 0 10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                  ⭐ {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'} / 10
                </p>
              </div>
              <button 
                onClick={() => handleRemove(item.id)} 
                className="btn-danger"
                style={{ width: '100%' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};