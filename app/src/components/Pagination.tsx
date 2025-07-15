import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  isDisabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage, isDisabled }) => (
  <div style={{ textAlign: 'center', marginBottom: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
    <button
      onClick={() => setPage(Math.max(page - 1, 1))}
      disabled={page === 1 || isDisabled}
      style={{
        background: page === 1 || isDisabled ? '#888' : '#ffd700',
        color: '#232526',
        border: 'none',
        borderRadius: 8,
        padding: '10px 24px',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: page === 1 || isDisabled ? 'not-allowed' : 'pointer',
        boxShadow: '0 2px 8px #0003',
        transition: 'background 0.2s',
      }}
    >Prev</button>
    <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 500 }}> Page {page} of {totalPages} </span>
    <form
      onSubmit={e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem('jumpPage') as HTMLInputElement;
        let val = Number(input.value);
        if (!isNaN(val) && val >= 1 && val <= totalPages) {
          setPage(val);
        }
        input.value = '';
      }}
      style={{ display: 'inline-flex', alignItems: 'center', margin: '0 8px' }}
    >
      <label htmlFor="jumpPage" style={{ color: '#fff', marginRight: 4, fontSize: '1rem' }}>Jump to:</label>
      <input
        id="jumpPage"
        name="jumpPage"
        type="number"
        min={1}
        max={totalPages}
        placeholder="Page #"
        style={{
          width: 70,
          padding: '6px 8px',
          borderRadius: 6,
          border: '1px solid #888',
          fontSize: '1rem',
          fontWeight: 500,
          background: '#232526',
          color: '#ffd700',
          outline: 'none',
          marginRight: 4,
        }}
      />
      <button
        type="submit"
        style={{
          background: '#40a9ff',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '6px 14px',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0003',
          transition: 'background 0.2s',
        }}
      >Go</button>
    </form>
    <button
      onClick={() => setPage(Math.min(page + 1, totalPages))}
      disabled={page === totalPages || isDisabled}
      style={{
        background: page === totalPages || isDisabled ? '#888' : '#ffd700',
        color: '#232526',
        border: 'none',
        borderRadius: 8,
        padding: '10px 24px',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: page === totalPages || isDisabled ? 'not-allowed' : 'pointer',
        boxShadow: '0 2px 8px #0003',
        transition: 'background 0.2s',
      }}
    >Next</button>
  </div>
);

export default Pagination;
