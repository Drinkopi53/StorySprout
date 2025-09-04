import React, { useState } from 'react';
import SharingService from '../services/SharingService';
import ShareModal from '../components/ShareModal';
import './Library.css';

function Library() {
  // This would normally come from an API
  const [savedStories, setSavedStories] = useState([
    {
      id: 1,
      title: "The Brave Little Squirrel",
      date: "2023-05-15",
      theme: "Adventure"
    },
    {
      id: 2,
      title: "Princess Luna and the Magic Garden",
      date: "2023-06-22",
      theme: "Fantasy"
    },
    {
      id: 3,
      title: "Captain Whiskers and the Pirate Treasure",
      date: "2023-07-10",
      theme: "Pirates"
    }
  ]);
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleShare = (story) => {
    setSelectedStory(story);
    setShowShareModal(true);
  };
  
  const closeShareModal = () => {
    setShowShareModal(false);
    setSelectedStory(null);
  };

  const handleRead = (storyId) => {
    // In a real app, this would navigate to the story reading page
    alert(`Opening story ${storyId} for reading`);
  };

  return (
    <div className="library">
      <h1 className="page-title">My Story Library</h1>
      <p className="page-subtitle">All the personalized stories created for your child</p>
      
      <div className="library-grid">
        {savedStories.map(story => (
          <div key={story.id} className="story-card">
            <div className="story-image-placeholder">
              <span>📚</span>
            </div>
            <div className="story-info">
              <h3>{story.title}</h3>
              <p className="story-date">Created: {story.date}</p>
              <p className="story-theme">Theme: {story.theme}</p>
              <div className="story-actions">
                <button 
                  className="read-button"
                  onClick={() => handleRead(story.id)}
                >
                  Read Again
                </button>
                <button 
                  className="share-button"
                  onClick={() => handleShare(story)}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showShareModal && selectedStory && (
        <ShareModal 
          storyId={selectedStory.id}
          storyTitle={selectedStory.title}
          onClose={closeShareModal}
        />
      )}
    </div>
  );
}

export default Library;