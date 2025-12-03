import { Search } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  onSearch?: (query: string) => void;
}

export default function TopBar({ onSearch }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="top-bar-sticky bg-white p-3">
      <div className="container-fluid">
        <div className="position-relative" style={{ maxWidth: '600px' }}>
          <Search className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} size={20} />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Rechercher des offres..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
