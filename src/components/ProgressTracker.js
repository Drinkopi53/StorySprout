import React from 'react';
import './ProgressTracker.css';

function ProgressTracker({ steps, currentStep }) {
  return (
    <div className="progress-tracker">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(currentStep / (steps - 1)) * 100}%` }}
        ></div>
      </div>
      <div className="progress-steps">
        {Array.from({ length: steps }).map((_, index) => (
          <div 
            key={index} 
            className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            {index < currentStep ? '✓' : index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressTracker;