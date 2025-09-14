import React from 'react';
import toast from 'react-hot-toast'; // Import toast
import './CategoryNav.css';

const CATEGORIES = ["business", "entertainment", "health", "science", "sports", "technology"];

// Accept 'user' as a prop
const CategoryNav = ({ selectedCategory, onSelectCategory, user }) => {

  const handleCategoryClick = (category) => {
    if (!user) {
      toast.error('You must be logged in to view categories.');
      return; // Stop the function
    }
    onSelectCategory(category);
  };

  return (
    <nav className="category-nav">
      {/* The "All News" button always works */}
      <button 
        onClick={() => onSelectCategory(null)}
        className={!selectedCategory ? 'active' : ''}
      >
        All News
      </button>
      {CATEGORIES.map(category => (
        <button 
          key={category} 
          onClick={() => handleCategoryClick(category)} // Use the new handler
          className={selectedCategory === category ? 'active' : ''}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNav;