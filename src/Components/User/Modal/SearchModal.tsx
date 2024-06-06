import React, { useState } from 'react';
import SearchIcon from '../../icons/SearchIcon';

interface SearchModalProps {
  onClose: () => void; // Prop for closing the modal
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearch = () => {
    // Implement search functionality here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Search</h2>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-2 border rounded-l-lg"
            placeholder="Search user..."
          />
          <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-r-lg">
            <SearchIcon />l
          </button>
        </div>
        {/* Render search results below */}
      </div>
    </div>
  );
};

export default SearchModal;

