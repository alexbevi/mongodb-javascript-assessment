import React from 'react';

interface SearchFormProps {
  searchInput: string;
  setSearchInput: (val: string) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchInput, setSearchInput, onSearch }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSearch();
    }}
    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
  >
    <input
      type="text"
      placeholder="Search by title..."
      value={searchInput}
      onChange={e => setSearchInput(e.target.value)}
      style={{
        padding: '10px 16px',
        borderRadius: 8,
        border: '1px solid #888',
        fontSize: '1.1rem',
        width: 240,
        background: '#232526',
        color: '#ffd700',
        outline: 'none',
        fontWeight: 500,
        marginRight: 4,
      }}
    />
    <button
      type="submit"
      style={{
        background: '#40a9ff',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '10px 24px',
        fontWeight: 600,
        fontSize: '1.1rem',
        cursor: 'pointer',
        boxShadow: '0 2px 8px #0003',
        transition: 'background 0.2s',
      }}
    >Search</button>
  </form>
);

export default SearchForm;
