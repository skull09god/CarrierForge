import React from 'react';
import './components.css';

export default function SkillGapAnalysis({ 
  targetRole, 
  currentSkills = [], 
  requiredSkills = [], 
  recommendations = [] 
}) {
  const matchedSkills = currentSkills.filter(skill => 
    requiredSkills.includes(skill)
  );
  
  const missingSkills = requiredSkills.filter(skill => 
    !currentSkills.includes(skill)
  );

  const matchPercentage = requiredSkills.length > 0
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 0;

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return '#ff4444';
      case 'high': return '#ff9800';
      case 'medium': return '#4caf50';
      default: return '#2196f3';
    }
  };

  return (
    <div className="component-card skill-gap-card">
      <h3>🎯 Skill Gap Analysis</h3>
      <div className="analysis-target">Target Role: <strong>{targetRole}</strong></div>

      <div className="match-score">
        <div className="score-circle">
          <svg width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="10"
              strokeDasharray={`${matchPercentage * 3.14} 314`}
              strokeDashoffset="0"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="score-label">
            <div className="score-value">{matchPercentage}%</div>
            <div className="score-text">Match</div>
          </div>
        </div>
        <div className="match-details">
          <div className="detail-stat">
            <span className="stat-number">{matchedSkills.length}</span>
            <span className="stat-label">Skills You Have</span>
          </div>
          <div className="detail-stat">
            <span className="stat-number">{missingSkills.length}</span>
            <span className="stat-label">Skills to Learn</span>
          </div>
        </div>
      </div>

      <div className="skills-breakdown">
        <div className="skills-section">
          <h4 className="section-title">✅ Your Strengths</h4>
          <div className="skills-list">
            {matchedSkills.map((skill, idx) => (
              <span key={idx} className="skill-badge matched">{skill}</span>
            ))}
          </div>
        </div>

        <div className="skills-section">
          <h4 className="section-title">📚 Skills to Develop</h4>
          <div className="skills-list">
            {missingSkills.map((skill, idx) => (
              <span key={idx} className="skill-badge missing">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="recommendations-section">
        <h4 className="section-title">💡 Learning Recommendations</h4>
        <div className="recommendations-list">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="recommendation-card">
              <div className="rec-header">
                <span className="rec-skill">{rec.skill}</span>
                <span
                  className="rec-priority"
                  style={{ backgroundColor: getPriorityColor(rec.priority) }}
                >
                  {rec.priority}
                </span>
              </div>
              {rec.resources && (
                <div className="rec-resources">
                  {rec.resources.map((resource, i) => (
                    <a key={i} href="#" className="rec-link">
                      {resource}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="gap-actions">
        <button className="secondary-button">Create Learning Plan</button>
        <button className="primary-button">Find Courses</button>
      </div>
    </div>
  );
}
