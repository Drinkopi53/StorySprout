import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryService from '../services/StoryService';
import AudioService from '../services/AudioService';
import ImageService from '../services/ImageService';
import SharingService from '../services/SharingService';
import ProgressTracker from './ProgressTracker';
import Bookmark from './Bookmark';
import StoryStats from './StoryStats';
import ShareModal from './ShareModal';
import './StoryDisplay.css';

function StoryDisplay() {
  const [story, setStory] = useState({
    id: 1,
    title: "The Brave Little Explorer",
    content: "Once upon a time, in a land filled with wonder, there lived a brave little adventurer. This character loved to explore and learn new things every day. One morning, they woke up to find a mysterious map under their pillow.",
    choices: [
      { id: 1, text: "Follow the map to the Enchanted Forest" },
      { id: 2, text: "Take the map to the village elder for advice" }
    ]
  });
  
  const [storyPath, setStoryPath] = useState([story]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [storyImage, setStoryImage] = useState('/mock-images/default.png');
  const [storyAudio, setStoryAudio] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [childAge, setChildAge] = useState("6-8"); // Default age group
  const navigate = useNavigate();

  const handleChoiceSelect = async (choiceId) => {
    setIsLoading(true);
    
    try {
      // Get the continuation of the story based on the choice and child's age
      const storyContinuation = await StoryService.continueStory(story, choiceId, childAge);
      
      // Create the new story segment
      const newStorySegment = {
        content: storyContinuation.content,
        choices: storyContinuation.choices
      };
      
      // Update the story path
      const newPath = [...storyPath, newStorySegment];
      setStoryPath(newPath);
      
      // Update current step
      const newStep = newPath.length - 1;
      setCurrentStep(newStep);
      
      // Update the current story
      setStory({
        ...story,
        content: storyContinuation.content,
        choices: storyContinuation.choices
      });
      
      // Generate image for the new story segment
      const imageUrl = await ImageService.generateImage(storyContinuation.content, childAge);
      setStoryImage(imageUrl);
    } catch (error) {
      console.error('Error continuing story:', error);
      alert('Failed to continue story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const previousStep = currentStep - 1;
      setCurrentStep(previousStep);
      setStory({
        ...story,
        content: storyPath[previousStep].content,
        choices: storyPath[previousStep].choices
      });
      
      // In a real app, we would retrieve the image for this step from storage
      setStoryImage('/mock-images/default.png');
    }
  };

  const handleRestart = () => {
    // Reset to the beginning of the story
    setCurrentStep(0);
    setStory({
      id: 1,
      title: "The Brave Little Explorer",
      content: "Once upon a time, in a land filled with wonder, there lived a brave little adventurer. This character loved to explore and learn new things every day. One morning, they woke up to find a mysterious map under their pillow.",
      choices: [
        { id: 1, text: "Follow the map to the Enchanted Forest" },
        { id: 2, text: "Take the map to the village elder for advice" }
      ]
    });
    
    // Reset image to default
    setStoryImage('/mock-images/default.png');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handlePlayAudio = () => {
    if (storyAudio) {
      AudioService.playAudio(storyAudio);
    } else {
      // Generate audio if it doesn't exist
      alert('Generating audio for the story...');
      // In a real app: 
      // const audioUrl = await AudioService.generateAudio(story.content, childAge);
      // setStoryAudio(audioUrl);
      // AudioService.playAudio(audioUrl);
    }
  };
  
  const handleShare = () => {
    setShowShareModal(true);
  };
  
  const closeShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <div className="story-display">
      <div className="story-header">
        <h1 className="story-title">{story.title}</h1>
        <div className="story-controls">
          <Bookmark isBookmarked={isBookmarked} onToggle={toggleBookmark} />
          <button className="audio-button" onClick={handlePlayAudio}>🔊 Listen</button>
          <button className="share-button" onClick={handleShare}>📤 Share</button>
        </div>
      </div>
      
      <ProgressTracker steps={storyPath.length + 2} currentStep={currentStep} />
      
      <StoryStats vocabularyCount={24} moralLessons={2} readingTime={15} />
      
      <div className="story-navigation">
        <button 
          onClick={handlePrevious} 
          disabled={currentStep === 0}
          className="nav-button"
        >
          ← Previous
        </button>
        <span className="story-position">
          Part {currentStep + 1} of {storyPath.length}
        </span>
        <button 
          onClick={handleRestart} 
          className="nav-button"
        >
          Restart
        </button>
      </div>
      
      <div className="story-content">
        {isLoading ? (
          <div className="loading">
            <p>Creating your story...</p>
          </div>
        ) : (
          <>
            <div className="story-image">
              <img src={storyImage} alt="Story illustration" />
            </div>
            
            <div className="story-text">
              <p>{story.content}</p>
            </div>
            
            {story.choices && story.choices.length > 0 && (
              <div className="story-choices">
                <h3>What should happen next?</h3>
                <div className="choices-container">
                  {story.choices.map(choice => (
                    <button 
                      key={choice.id}
                      className="choice-button"
                      onClick={() => handleChoiceSelect(choice.id)}
                      disabled={isLoading}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {showShareModal && (
        <ShareModal 
          storyId={story.id}
          storyTitle={story.title}
          onClose={closeShareModal}
        />
      )}
    </div>
  );
}

export default StoryDisplay;