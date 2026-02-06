import React, { useState } from 'react';
import './components.css';

export default function CareerAssessment({ questions = [], onComplete, category = "Career Fit" }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  if (questions.length === 0) {
    return <div className="component-card">No questions available</div>;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="component-card assessment-card">
      <div className="assessment-header">
        <h3>{category} Assessment</h3>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="question-container">
        <h4 className="question-text">{questions[currentQuestion].question}</h4>
        
        <div className="options-grid">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="option-button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="secondary-button"
        >
          ← Previous
        </button>
      )}
    </div>
  );
}
