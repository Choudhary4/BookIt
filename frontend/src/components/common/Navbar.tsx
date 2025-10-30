import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/logo.png"
            alt="Highway Delite Logo"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <input
            type="text"
            placeholder="Search experiences"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full max-w-sm px-4 py-2 bg-[#F7F7F7] rounded-md text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#FFD84D] border border-gray-100"
          />
          <button
            onClick={handleSearch}
            className="bg-[#FFD84D] hover:bg-[#f5c933] text-black font-semibold px-5 py-2 rounded-md text-sm transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
