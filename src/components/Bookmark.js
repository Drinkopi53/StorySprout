import React, { useState } from 'react';
import './Bookmark.css';

function Bookmark({ isBookmarked, onToggle }) {
  return (
    <button 
      className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
      onClick={onToggle}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? '★' : '☆'}
    </button>
  );
}

export default Bookmark;