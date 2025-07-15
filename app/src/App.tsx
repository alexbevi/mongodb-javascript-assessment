import React, { useState, useEffect } from 'react';

import { Movie } from './types/Movie';
import { ApiResponse } from './types/ApiResponse';
import PageSizeSelector from './components/PageSizeSelector';
import SearchForm from './components/SearchForm';
import Pagination from './components/Pagination';
import MovieModal from './components/MovieModal';


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
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
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
