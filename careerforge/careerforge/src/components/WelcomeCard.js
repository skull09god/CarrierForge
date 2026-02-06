import React from 'react';
import './components.css';

export default function WelcomeCard({ userName = "there", onGetStarted }) {
  return (
    <div className="component-card welcome-card">
      <div className="welcome-icon">🎯</div>
      <h2>Welcome to CareerForge</h2>
      <p className="welcome-subtitle">
        The only career coach that rebuilds its interface for you in real time.
      </p>
      <p className="welcome-tagline">
        No forms. No menus. Just conversation.
      </p>
      
      <div className="feature-grid">
        <div className="feature-item">
          <div className="feature-icon">📝</div>
          <div className="feature-label">Resume</div>
          <div className="feature-description">Powered by Tambo Generated UI</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💼</div>
          <div className="feature-label">Jobs</div>
          <div className="feature-description">Real-time Interface Adaptation</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon">📊</div>
          <div className="feature-label">Roadmap</div>
          <div className="feature-description">AI decides what you see</div>
        </div>
      </div>

      <button className="primary-button" onClick={onGetStarted}>
        Start Your Journey
      </button>

      <div className="welcome-hint">
        Hi! I'm CareerForge, your AI career coach powered by generative UI. 
        Tell me about yourself and your career goals in your own words.
      </div>
    </div>
  );
}
