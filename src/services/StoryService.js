import API_CONFIG from './apiConfig';
import AgeCustomizationService from './AgeCustomizationService';

class StoryService {
  // Generate a story based on user preferences
  static async generateStory(storySettings) {
    try {
      // Get age-based settings
      const ageSettings = AgeCustomizationService.getAgeSettings(storySettings.childAge);
      
      // In a real implementation, we would call the Gemini API with these settings
      // For now, we'll return a mock story
      console.log('Generating story with settings:', storySettings);
      console.log('Age settings:', ageSettings);
      
      // Mock story data
      const mockStory = {
        title: `The Brave Little ${storySettings.childName || 'Explorer'}`,
        content: "Once upon a time, in a land filled with wonder, there lived a brave little adventurer. This character loved to explore and learn new things every day. One morning, they woke up to find a mysterious map under their pillow.",
        choices: [
          { id: 1, text: "Follow the map to the Enchanted Forest" },
          { id: 2, text: "Take the map to the village elder for advice" }
        ]
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return mockStory;
    } catch (error) {
      console.error('Error generating story:', error);
      throw error;
    }
  }
  
  // Continue a story based on user choice
  static async continueStory(currentStory, choiceId, childAge) {
    try {
      // Get age-based settings
      const ageSettings = AgeCustomizationService.getAgeSettings(childAge);
      
      // In a real implementation, we would call the Gemini API
      // For now, we'll return a mock continuation
      console.log('Continuing story with choice:', choiceId);
      console.log('Age settings:', ageSettings);
      
      // Mock story continuation
      const continuations = {
        1: {
          content: "The forest was filled with glowing flowers and talking animals. A wise owl landed on a branch nearby and offered to guide our hero on their journey.",
          choices: [
            { id: 3, text: "Accept the owl's guidance" },
            { id: 4, text: "Decide to explore alone" }
          ]
        },
        2: {
          content: "The village elder examined the map carefully and explained that it was a treasure map from ancient times. The treasure could help the whole village, but the journey would be dangerous.",
          choices: [
            { id: 5, text: "Embark on the dangerous journey" },
            { id: 6, text: "Ask friends to join the adventure" }
          ]
        }
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return continuations[choiceId] || continuations[1];
    } catch (error) {
      console.error('Error continuing story:', error);
      throw error;
    }
  }
}

export default StoryService;