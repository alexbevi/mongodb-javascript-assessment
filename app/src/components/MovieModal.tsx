import React from 'react';
import { Movie } from '../types/Movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onClick={onClose}
  >
    <div
      style={{
        background: '#232526',
        borderRadius: 20,
        boxShadow: '0 4px 32px #000a',
        padding: 32,
        minWidth: 340,
        maxWidth: 480,
        width: '90vw',
        color: '#fff',
        position: 'relative',
        textAlign: 'left',
        fontSize: '1.05rem',
      }}
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: 28,
          fontWeight: 700,
          cursor: 'pointer',
          zIndex: 10,
          padding: 0,
          lineHeight: 1,
          textShadow: '0 2px 8px #000a',
        }}
        aria-label="Close"
      >×</button>
      <div style={{ textAlign: 'center' }}>
        <img
          src={movie.poster ? movie.poster : 'https://via.placeholder.com/340x340?text=No+Image'}
          alt={movie.poster ? movie.title : 'No poster available'}
          style={{
            width: '100%',
            height: 340,
            objectFit: 'cover',
            borderRadius: 14,
            marginBottom: 18,
            boxShadow: '0 2px 8px #0006',
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).onerror = null;
            (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/340x340?text=No+Image';
          }}
        />
      </div>
      <h2 style={{ fontSize: '2rem', margin: '10px 0 8px 0', fontWeight: 700, textAlign: 'center' }}>{movie.title}</h2>
      <p style={{ color: '#ffd700', fontSize: '1.2rem', fontWeight: 600, margin: '0 0 10px 0', textAlign: 'center' }}>Year: {movie.year}{movie.rated ? ` | Rated: ${movie.rated}` : ''}</p>
      {movie.plot && <p style={{ margin: '10px 0 14px 0', color: '#eee' }}>{movie.plot}</p>}
      {movie.genres && movie.genres.length > 0 && (
        <div style={{ marginBottom: 8 }}><b>Genres:</b> {movie.genres.join(', ')}</div>
      )}
      {movie.runtime && (
        <div style={{ marginBottom: 8 }}><b>Runtime:</b> {movie.runtime} min</div>
      )}
      {movie.imdb && (movie.imdb.rating || movie.imdb.votes) && (
        <div style={{ marginBottom: 8 }}>
          <b>IMDb:</b>
          {movie.imdb.rating ? ` ${movie.imdb.rating}` : ''}
          {movie.imdb.votes ? ` (${movie.imdb.votes} votes)` : ''}
        </div>
      )}
      {movie.tomatoes && movie.tomatoes.viewer && (
        <div style={{ marginBottom: 8 }}>
          <b>Rotten Tomatoes:</b>
          {movie.tomatoes.viewer.rating ? ` ${movie.tomatoes.viewer.rating}/5` : ''}
          {movie.tomatoes.viewer.meter ? ` (${movie.tomatoes.viewer.meter}%)` : ''}
        </div>
      )}
      {movie.directors && movie.directors.length > 0 && (
        <div style={{ marginBottom: 8 }}><b>Director{movie.directors.length > 1 ? 's' : ''}:</b> {movie.directors.join(', ')}</div>
      )}
      {movie.cast && movie.cast.length > 0 && (
        <div style={{ marginBottom: 8 }}><b>Cast:</b> {movie.cast.slice(0, 6).join(', ')}{movie.cast.length > 6 ? ', ...' : ''}</div>
      )}
      {movie.awards && movie.awards.text && (
        <div style={{ marginBottom: 8 }}><b>Awards:</b> {movie.awards.text}</div>
      )}
      {movie.languages && movie.languages.length > 0 && (
        <div style={{ marginBottom: 8 }}><b>Languages:</b> {movie.languages.join(', ')}</div>
      )}
      {movie.countries && movie.countries.length > 0 && (
        <div style={{ marginBottom: 8 }}><b>Countries:</b> {movie.countries.join(', ')}</div>
      )}
      {movie.runtime && (
        <div style={{ marginBottom: 8 }}><b>Runtime:</b> {movie.runtime} min</div>
      )}
      {movie.writers && movie.writers.length > 0 && (
        <div style={{ marginBottom: 8 }}><b>Writers:</b> {movie.writers.join(', ')}</div>
      )}
    </div>
  </div>
);

export default MovieModal;
