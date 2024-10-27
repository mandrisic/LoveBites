import React from 'react';
import '../css/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        className="pagination-btn" 
        onClick={handlePrevPage} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button 
        className="pagination-btn" 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;