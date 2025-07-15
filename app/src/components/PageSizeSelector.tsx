import React from 'react';

interface PageSizeSelectorProps {
  pageSize: number;
  setPageSize: (size: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, setPageSize }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label htmlFor="page-size-select" style={{ color: '#fff', fontWeight: 500, marginRight: 8 }}>Page size:</label>
    <select
      id="page-size-select"
      value={pageSize}
      onChange={e => setPageSize(Number(e.target.value))}
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        border: '1px solid #888',
        fontSize: '1rem',
        fontWeight: 500,
        background: '#232526',
        color: '#ffd700',
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      {[10, 25, 50, 100].map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default PageSizeSelector;
