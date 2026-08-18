import React from 'react';
import type { Movie } from './tmdb';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          borderRadius: '12px',
          maxWidth: '550px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid #334155',
          position: 'relative',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '18px',
            zIndex: 2
          }}
        >
          ✕
        </button>

        {/* Poster / Backdrop Header */}
        <img 
          src={
            movie.backdrop_path 
              ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
              : movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x280?text=No+Image'
          } 
          alt={movie.title}
          style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
        />

        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '24px' }}>{movie.title}</h2>
          
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#94a3b8', marginBottom: '16px' }}>
            <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</span>
            {movie.release_date && <span>📅 {movie.release_date}</span>}
          </div>

          <h4 style={{ margin: '0 0 8px', color: '#cbd5e1' }}>Overview</h4>
          <p style={{ lineHeight: '1.6', color: '#94a3b8', margin: 0, fontSize: '15px' }}>
            {movie.overview || 'No overview available for this movie.'}
          </p>
        </div>
      </div>
    </div>
  );
};