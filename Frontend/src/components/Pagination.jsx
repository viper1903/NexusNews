import React from 'react';
import toast from 'react-hot-toast';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, user }) => {
  const handlePageClick = (pageNumber) => {
    if (!user && pageNumber > 0) {
      toast.error('You must log in to see more articles.');
      return; // Stop the function here
    }
    
    // Ensure page number is within bounds before changing
    if (pageNumber >= 0 && pageNumber < totalPages) {
      onPageChange(pageNumber);
    }
  };

  // --- THIS FUNCTION WAS MISSING ---
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(0, currentPage - halfPages);
      let endPage = Math.min(totalPages - 1, currentPage + halfPages);

      if (currentPage - halfPages < 0) {
        endPage = Math.min(totalPages - 1, endPage + (halfPages - currentPage));
      }
      if (currentPage + halfPages >= totalPages) {
        startPage = Math.max(0, startPage - (currentPage + halfPages - (totalPages - 1)));
      }
      if (startPage > 0) {
        pageNumbers.push(0);
        if (startPage > 1) pageNumbers.push('...');
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages - 1) {
        if (endPage < totalPages - 2) pageNumbers.push('...');
        pageNumbers.push(totalPages - 1);
      }
    }
    return pageNumbers;
  };
  // --- END OF MISSING FUNCTION ---

  return (
    <div className="pagination-container">
      <button 
        onClick={() => handlePageClick(currentPage - 1)} 
        disabled={currentPage === 0}
        className="pagination-arrow"
      >
        &laquo; Prev
      </button>

      {getPageNumbers().map((number, index) =>
        number === '...' ? (
          <span key={index} className="pagination-ellipsis">...</span>
        ) : (
          <button 
            key={number} 
            onClick={() => handlePageClick(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number + 1}
          </button>
        )
      )}

      <button 
        onClick={() => handlePageClick(currentPage + 1)} 
        disabled={currentPage === totalPages - 1}
        className="pagination-arrow"
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;