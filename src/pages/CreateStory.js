import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryService from '../services/StoryService';
import AgeCustomizationService from '../services/AgeCustomizationService';
import UserProfileService from '../services/UserProfileService';
import './CreateStory.css';

function CreateStory() {
  const [storySettings, setStorySettings] = useState({
    childName: '',
    childAge: '',
    interests: '',
    learningGoals: '',
    storyTheme: '',
    storyLength: 'short'
  });
  
  const [learningGoals, setLearningGoals] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const profile = await UserProfileService.getProfile();
      setChildren(profile.children);
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChildSelect = (childId) => {
    const child = children.find(c => c.id == childId);
    if (child) {
      setStorySettings({
        ...storySettings,
        childName: child.name,
        childAge: child.age,
        interests: child.interests.join(', '),
        learningGoals: child.learningGoals.join(', ')
      });
      
      // Update learning goals when child is selected
      const goals = AgeCustomizationService.getLearningGoals(child.age);
      setLearningGoals(goals);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStorySettings({
      ...storySettings,
      [name]: value
    });
    
    // Update learning goals when age changes
    if (name === 'childAge' && value) {
      const goals = AgeCustomizationService.getLearningGoals(value);
      setLearningGoals(goals);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // Generate the story using our service
      const generatedStory = await StoryService.generateStory(storySettings);
      
      // In a real app, we would store the story in context or state management
      console.log('Generated story:', generatedStory);
      
      // Navigate to the story display page
      navigate('/story');
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return <div className="create-story">Loading...</div>;
  }

  return (
    <div className="create-story">
      <h1 className="page-title">Create a New Story</h1>
      <p className="page-subtitle">Customize a fairy tale for your child's unique interests and learning goals</p>
      
      <form className="story-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="childSelect">Select Child:</label>
          <select
            id="childSelect"
            onChange={(e) => handleChildSelect(e.target.value)}
          >
            <option value="">Select a child</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="childName">Child's Name:</label>
          <input
            type="text"
            id="childName"
            name="childName"
            value={storySettings.childName}
            onChange={handleInputChange}
            placeholder="Enter your child's name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="childAge">Child's Age:</label>
          <select
            id="childAge"
            name="childAge"
            value={storySettings.childAge}
            onChange={handleInputChange}
            required
          >
            <option value="">Select age</option>
            <option value="3-5">3-5 years</option>
            <option value="6-8">6-8 years</option>
            <option value="9-12">9-12 years</option>
          </select>
        </div>
        
        {learningGoals.length > 0 && (
          <div className="form-group">
            <label>Age-Appropriate Learning Goals:</label>
            <ul className="learning-goals-list">
              {learningGoals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="interests">Interests:</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={storySettings.interests}
            onChange={handleInputChange}
            placeholder="Animals, space, pirates, etc."
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="learningGoals">Learning Goals:</label>
          <select
            id="learningGoals"
            name="learningGoals"
            value={storySettings.learningGoals}
            onChange={handleInputChange}
          >
            <option value="">Select a goal</option>
            <option value="vocabulary">Vocabulary Building</option>
            <option value="morals">Moral Lessons</option>
            <option value="numbers">Numbers & Counting</option>
            <option value="shapes">Shapes & Colors</option>
            <option value="emotions">Emotional Intelligence</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="storyTheme">Story Theme:</label>
          <select
            id="storyTheme"
            name="storyTheme"
            value={storySettings.storyTheme}
            onChange={handleInputChange}
          >
            <option value="">Select a theme</option>
            <option value="adventure">Adventure</option>
            <option value="fantasy">Fantasy</option>
            <option value="animals">Animals</option>
            <option value="fairy-tale">Classic Fairy Tale</option>
            <option value="science">Science</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Story Length:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="storyLength"
                value="short"
                checked={storySettings.storyLength === 'short'}
                onChange={handleInputChange}
              />
              Short (5-10 pages)
            </label>
            <label>
              <input
                type="radio"
                name="storyLength"
                value="medium"
                checked={storySettings.storyLength === 'medium'}
                onChange={handleInputChange}
              />
              Medium (10-15 pages)
            </label>
            <label>
              <input
                type="radio"
                name="storyLength"
                value="long"
                checked={storySettings.storyLength === 'long'}
                onChange={handleInputChange}
              />
              Long (15+ pages)
            </label>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="generate-button"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Story'}
        </button>
      </form>
    </div>
  );
}

export default CreateStory;