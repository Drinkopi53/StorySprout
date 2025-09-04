import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to StorySprout</h1>
        <p className="hero-subtitle">Interactive Educational Fairy Tales Personalized for Your Child</p>
        <button className="cta-button">Create Your First Story</button>
      </div>
      
      <div className="features-section">
        <h2 className="section-title">Why StorySprout?</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Personalized Learning</h3>
            <p>Stories tailored to your child's age, interests, and learning goals</p>
          </div>
          <div className="feature-card">
            <h3>Interactive Adventures</h3>
            <p>"Choose your own path" stories that engage and entertain</p>
          </div>
          <div className="feature-card">
            <h3>Educational Content</h3>
            <p>Built-in vocabulary building and moral lessons</p>
          </div>
          <div className="feature-card">
            <h3>Audio & Visuals</h3>
            <p>Beautiful illustrations and narrated stories</p>
          </div>
        </div>
      </div>
      
      <div className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Tell Us About Your Child</h3>
            <p>Age, interests, and learning objectives</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Generates a Story</h3>
            <p>Personalized fairy tale in seconds</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Enjoy & Learn</h3>
            <p>Read, listen, and explore different story paths</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Share & Save</h3>
            <p>Keep stories in your library and share with family</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;