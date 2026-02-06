import React from 'react';
import './components.css';

export default function ProgressTracker({ goal, milestones = [], percentComplete = 0 }) {
  return (
    <div className="component-card progress-tracker-card">
      <h3>📈 Progress Tracker</h3>
      <div className="tracker-goal">{goal}</div>

      <div className="overall-progress">
        <div className="progress-percentage">{percentComplete}% Complete</div>
        <div className="progress-container large">
          <div className="progress-bar" style={{ width: `${percentComplete}%` }}></div>
        </div>
      </div>

      <div className="milestones-timeline">
        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className={`milestone-item ${milestone.completed ? 'completed' : 'pending'}`}
          >
            <div className="milestone-marker">
              {milestone.completed ? '✓' : idx + 1}
            </div>
            <div className="milestone-content">
              <h4 className="milestone-title">{milestone.title}</h4>
              <div className="milestone-date">{milestone.date}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tracker-actions">
        <button className="secondary-button">Update Progress</button>
        <button className="primary-button">What's Next?</button>
      </div>
    </div>
  );
}
