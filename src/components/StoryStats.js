import React from 'react';
import './StoryStats.css';

function StoryStats({ vocabularyCount, moralLessons, readingTime }) {
  return (
    <div className="story-stats">
      <div className="stat-card">
        <h3>New Words</h3>
        <p className="stat-value">{vocabularyCount || 12}</p>
        <p className="stat-label">Vocabulary learned</p>
      </div>
      
      <div className="stat-card">
        <h3>Lessons</h3>
        <p className="stat-value">{moralLessons || 3}</p>
        <p className="stat-label">Moral lessons</p>
      </div>
      
      <div className="stat-card">
        <h3>Reading</h3>
        <p className="stat-value">{readingTime || 8}</p>
        <p className="stat-label">Minutes of reading</p>
      </div>
    </div>
  );
}

export default StoryStats;