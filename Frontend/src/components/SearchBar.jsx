import React from 'react';
import toast from 'react-hot-toast'; // Import toast
import './SearchBar.css';

// Accept 'user' as a new prop
const SearchBar = ({ searchQuery, setSearchQuery, user }) => {

  const handleFocus = () => {
    // If there is no user, show an error toast and do nothing
    if (!user) {
      toast.error('Please log in to search for articles.');
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for articles by keyword..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // If there's no user, disable typing.
        // Otherwise, allow typing.
        onFocus={handleFocus}
        readOnly={!user} 
      />
    </div>
  );
};

export default SearchBar;