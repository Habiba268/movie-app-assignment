import { useState } from 'react';
import { Auth } from './Auth';
import { MovieList } from './MovieList';
import { Watchlist } from './Watchlist';

function App() {
  const [tab, setTab] = useState<'explore' | 'watchlist'>('explore');

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>🎬 Movie App</h1>
      <Auth />

      {/* Navigation Bar */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setTab('explore')} 
          style={{ padding: '10px 20px', fontWeight: tab === 'explore' ? 'bold' : 'normal', cursor: 'pointer' }}
        >
          🎬 Explore Movies
        </button>
        <button 
          onClick={() => setTab('watchlist')} 
          style={{ padding: '10px 20px', fontWeight: tab === 'watchlist' ? 'bold' : 'normal', cursor: 'pointer' }}
        >
          🔖 My Watchlist
        </button>
      </div>

      {/* Tab Content */}
      {tab === 'explore' ? <MovieList /> : <Watchlist />}
    </div>
  );
}

export default App;