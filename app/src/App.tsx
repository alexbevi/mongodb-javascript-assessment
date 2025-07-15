import React, { useState, useEffect } from 'react';

import { Movie } from './types/Movie';
import { ApiResponse } from './types/ApiResponse';
import PageSizeSelector from './components/PageSizeSelector';
import SearchForm from './components/SearchForm';
import Pagination from './components/Pagination';


const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pageSize),
      });
      if (search) params.append('search', search);
      console.log(`Fetching movies for page ${page} with pageSize ${pageSize} and search '${search}'`);
      try {
        const res = await fetch(`/api/movies?${params.toString()}`);
        console.log(`API response status: ${res.status}`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const apiData = await res.json();
        console.log('API data received:', apiData);
        setData(apiData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch movies');
        setData(null);
        console.error('API fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, pageSize, search]);

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #232526 0%, #414345 100%)',
      padding: '0',
      margin: '0',
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      <header style={{
        background: 'rgba(0,0,0,0.7)',
        color: '#fff',
        padding: '32px 0 24px 0',
        textAlign: 'center',
        marginBottom: '32px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          letterSpacing: '2px',
          margin: 0,
          fontWeight: 700,
          textShadow: '0 2px 8px #0008'
        }}>🍿 Mflix Movies</h1>
        <p style={{ color: '#ccc', marginTop: 8, fontSize: '1.1rem' }}>
          Browse the best movies from the{' '}
          <a
            href="https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/"
            style={{
              color: '#40a9ff',
              textDecoration: 'underline',
              fontWeight: 600,
              transition: 'color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.color = '#ffd700')}
            onMouseOut={e => (e.currentTarget.style.color = '#40a9ff')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sample Mflix Dataset
          </a>{' '}in MongoDB Atlas
        </p>
      </header>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <SearchForm
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onSearch={() => {
              setSearch(searchInput.trim());
              setPage(1);
            }}
          />
          <PageSizeSelector
            pageSize={pageSize}
            setPageSize={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
        {loading && <div style={{ color: '#fff', textAlign: 'center', fontSize: '1.2rem' }}>Loading...</div>}
        {error && <div style={{ color: '#ff4d4f', textAlign: 'center', fontWeight: 500 }}>Error: {error}</div>}
        {!loading && !error && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '28px',
              marginBottom: '32px',
            }}>
              {data && data.movies.length > 0 ? (
                data.movies.map(m => (
                  <div
                    key={m._id}
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      borderRadius: 16,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                      padding: 18,
                      textAlign: 'center',
                      color: '#fff',
                      transition: 'transform 0.2s',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedMovie(m)}
                  >
                    <img
                      src={m.poster ? m.poster : 'https://placehold.co/200x280/000000/FFFFFF.png?text=No+Image'}
                      alt={m.poster ? m.title : 'No poster available'}
                      style={{
                        width: '100%',
                        height: 280,
                        objectFit: 'cover',
                        borderRadius: 12,
                        marginBottom: 12,
                        boxShadow: '0 2px 8px #0006'
                      }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/200x280/000000/FFFFFF.png?text=No+Image';
                      }}
                    />
                    <h3 style={{ fontSize: '1.2rem', margin: '10px 0 4px 0', fontWeight: 600 }}>
                      {m.title}
                    </h3>
                    <p style={{ color: '#ffd700', margin: 0, fontWeight: 500 }}>
                      {m.year}
                    </p>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#fff', fontSize: '1.2rem' }}>No movies found.</div>
              )}
      {/* Movie Modal */}
      {selectedMovie && (
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
          onClick={() => setSelectedMovie(null)}
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
              onClick={() => setSelectedMovie(null)}
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
              src={selectedMovie.poster ? selectedMovie.poster : 'https://via.placeholder.com/340x340?text=No+Image'}
              alt={selectedMovie.poster ? selectedMovie.title : 'No poster available'}
              style={{
                width: '100%',
                height: 340,
                objectFit: 'cover',
                borderRadius: 14,
                marginBottom: 18,
                boxShadow: '0 2px 8px #0006',
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/340x340?text=No+Image';
              }}
            />
            </div>
            <h2 style={{ fontSize: '2rem', margin: '10px 0 8px 0', fontWeight: 700, textAlign: 'center' }}>{selectedMovie.title}</h2>
            <p style={{ color: '#ffd700', fontSize: '1.2rem', fontWeight: 600, margin: '0 0 10px 0', textAlign: 'center' }}>Year: {selectedMovie.year}{selectedMovie.rated ? ` | Rated: ${selectedMovie.rated}` : ''}</p>
            {selectedMovie.plot && <p style={{ margin: '10px 0 14px 0', color: '#eee' }}>{selectedMovie.plot}</p>}
            {selectedMovie.genres && selectedMovie.genres.length > 0 && (
              <div style={{ marginBottom: 8 }}><b>Genres:</b> {selectedMovie.genres.join(', ')}</div>
            )}
            {selectedMovie.runtime && (
              <div style={{ marginBottom: 8 }}><b>Runtime:</b> {selectedMovie.runtime} min</div>
            )}
            {selectedMovie.imdb && (selectedMovie.imdb.rating || selectedMovie.imdb.votes) && (
              <div style={{ marginBottom: 8 }}>
                <b>IMDb:</b>
                {selectedMovie.imdb.rating ? ` ${selectedMovie.imdb.rating}` : ''}
                {selectedMovie.imdb.votes ? ` (${selectedMovie.imdb.votes} votes)` : ''}
              </div>
            )}
            {selectedMovie.tomatoes && selectedMovie.tomatoes.viewer && (
              <div style={{ marginBottom: 8 }}>
                <b>Rotten Tomatoes:</b>
                {selectedMovie.tomatoes.viewer.rating ? ` ${selectedMovie.tomatoes.viewer.rating}/5` : ''}
                {selectedMovie.tomatoes.viewer.meter ? ` (${selectedMovie.tomatoes.viewer.meter}%)` : ''}
              </div>
            )}
            {selectedMovie.directors && selectedMovie.directors.length > 0 && (
              <div style={{ marginBottom: 8 }}><b>Director{selectedMovie.directors.length > 1 ? 's' : ''}:</b> {selectedMovie.directors.join(', ')}</div>
            )}
            {selectedMovie.cast && selectedMovie.cast.length > 0 && (
              <div style={{ marginBottom: 8 }}><b>Cast:</b> {selectedMovie.cast.slice(0, 6).join(', ')}{selectedMovie.cast.length > 6 ? ', ...' : ''}</div>
            )}
            {selectedMovie.awards && selectedMovie.awards.text && (
              <div style={{ marginBottom: 8 }}><b>Awards:</b> {selectedMovie.awards.text}</div>
            )}
            {selectedMovie.languages && selectedMovie.languages.length > 0 && (
              <div style={{ marginBottom: 8 }}><b>Languages:</b> {selectedMovie.languages.join(', ')}</div>
            )}
            {selectedMovie.countries && selectedMovie.countries.length > 0 && (
              <div style={{ marginBottom: 8 }}><b>Countries:</b> {selectedMovie.countries.join(', ')}</div>
            )}
            {selectedMovie.runtime && (
              <div style={{ marginBottom: 8 }}><b>Runtime:</b> {selectedMovie.runtime} min</div>
            )}
            {selectedMovie.writers && selectedMovie.writers.length > 0 && (
              <div style={{ marginBottom: 8 }}><b>Writers:</b> {selectedMovie.writers.join(', ')}</div>
            )}
          </div>
        </div>
      )}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              isDisabled={!!data && data.total === 0}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
