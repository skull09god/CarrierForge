import React, { useState } from 'react';
import './components.css';

export default function InterviewPrep({ company, role, questions = [], onPractice }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [preparedAnswers, setPreparedAnswers] = useState({});

  const categoryColors = {
    behavioral: '#4CAF50',
    technical: '#2196F3',
    situational: '#FF9800',
    company: '#9C27B0'
  };

  const handleSaveAnswer = (answer) => {
    setPreparedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  return (
    <div className="component-card interview-prep-card">
      <div className="prep-header">
        <h3>🎤 Interview Preparation</h3>
        <div className="interview-details">
          <div className="detail-item">
            <strong>Company:</strong> {company}
          </div>
          <div className="detail-item">
            <strong>Role:</strong> {role}
          </div>
        </div>
      </div>

      <div className="question-navigator">
        <div className="nav-pills">
          {questions.map((_, idx) => (
            <button
              key={idx}
              className={`nav-pill ${currentQuestion === idx ? 'active' : ''} ${preparedAnswers[idx] ? 'prepared' : ''}`}
              onClick={() => {
                setCurrentQuestion(idx);
                setShowAnswer(false);
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {questions.length > 0 && (
        <div className="current-question">
          <div className="question-meta">
            <span
              className="category-badge"
              style={{ backgroundColor: categoryColors[questions[currentQuestion].category] }}
            >
              {questions[currentQuestion].category}
            </span>
            <span className="question-number">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <h4 className="interview-question">{questions[currentQuestion].question}</h4>

          <div className="answer-section">
            <textarea
              className="answer-input"
              placeholder="Prepare your answer here..."
              value={preparedAnswers[currentQuestion] || ''}
              onChange={(e) => handleSaveAnswer(e.target.value)}
              rows={6}
            />
          </div>

          <div className="question-actions">
            <button
              className="secondary-button"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? 'Hide' : 'Show'} Tips
            </button>
            <button
              className="primary-button"
              onClick={() => onPractice?.(questions[currentQuestion])}
            >
              Practice with AI
            </button>
          </div>

          {showAnswer && (
            <div className="answer-tips">
              <h5>💡 Tips for this question:</h5>
              <ul>
                <li>Use the STAR method (Situation, Task, Action, Result)</li>
                <li>Be specific with examples from your experience</li>
                <li>Keep your answer focused and under 2 minutes</li>
                <li>Relate your answer to the role requirements</li>
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="prep-progress">
        {Object.keys(preparedAnswers).length} of {questions.length} questions prepared
      </div>
    </div>
  );
}
