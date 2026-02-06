import React, { useState } from 'react';
import './components.css';

export default function ActionPlan({ goal, steps = [], onStepComplete }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const toggleStep = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
      onStepComplete?.(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44aaff';
      default: return '#666';
    }
  };

  const completedCount = completedSteps.size;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="component-card action-plan-card">
      <div className="plan-header">
        <h3>🎯 Your Action Plan</h3>
        <div className="goal-statement">{goal}</div>
      </div>

      <div className="progress-section">
        <div className="progress-stats">
          <span>{completedCount} of {steps.length} completed</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="steps-list">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className={`step-item ${completedSteps.has(step.id) ? 'completed' : ''}`}
          >
            <div className="step-checkbox">
              <input
                type="checkbox"
                checked={completedSteps.has(step.id)}
                onChange={() => toggleStep(step.id)}
                id={`step-${step.id}`}
              />
              <label htmlFor={`step-${step.id}`}></label>
            </div>
            
            <div className="step-content">
              <div className="step-header">
                <h4 className="step-title">{step.title}</h4>
                <div className="step-meta">
                  <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(step.priority) }}
                  >
                    {step.priority}
                  </span>
                  <span className="timeframe">{step.timeframe}</span>
                </div>
              </div>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="plan-footer">
        <button className="secondary-button">Adjust Plan</button>
        <button className="primary-button">Get More Help</button>
      </div>
    </div>
  );
}
