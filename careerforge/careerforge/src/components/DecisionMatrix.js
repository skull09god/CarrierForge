import React, { useState } from 'react';
import './components.css';

export default function DecisionMatrix({ options = [], criteria = [], scores = {}, onDecide }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const calculateTotalScore = (optionId) => {
    let total = 0;
    criteria.forEach(criterion => {
      const score = scores[optionId]?.[criterion.name] || 0;
      total += score * (criterion.weight || 1);
    });
    return total;
  };

  const optionsWithScores = options.map(option => ({
    ...option,
    totalScore: calculateTotalScore(option.id)
  })).sort((a, b) => b.totalScore - a.totalScore);

  const maxScore = Math.max(...optionsWithScores.map(o => o.totalScore));

  return (
    <div className="component-card decision-matrix-card">
      <h3>📊 Decision Matrix</h3>
      <p className="matrix-subtitle">Compare your options based on what matters most</p>

      <div className="matrix-container">
        <table className="decision-table">
          <thead>
            <tr>
              <th>Option</th>
              {criteria.map((criterion, idx) => (
                <th key={idx}>
                  {criterion.name}
                  <span className="weight-badge">×{criterion.weight}</span>
                </th>
              ))}
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {optionsWithScores.map((option, idx) => (
              <tr
                key={option.id}
                className={`matrix-row ${option.totalScore === maxScore ? 'top-choice' : ''}`}
                onClick={() => setSelectedOption(option.id)}
              >
                <td className="option-name">
                  {option.totalScore === maxScore && <span className="winner-badge">🏆</span>}
                  {option.name}
                </td>
                {criteria.map((criterion, i) => {
                  const score = scores[option.id]?.[criterion.name] || 0;
                  return (
                    <td key={i}>
                      <div className="score-cell">
                        <span className="score-value">{score}</span>
                        <div className="score-bar-container">
                          <div
                            className="score-bar"
                            style={{ width: `${(score / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  );
                })}
                <td className="total-score">
                  <strong>{option.totalScore.toFixed(1)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="matrix-recommendation">
        <h4>💡 Recommendation</h4>
        <p>
          Based on your priorities, <strong>{optionsWithScores[0].name}</strong> appears to be 
          the best choice with a total score of <strong>{optionsWithScores[0].totalScore.toFixed(1)}</strong>.
        </p>
      </div>

      <button
        className="primary-button"
        onClick={() => onDecide(optionsWithScores[0].id)}
        disabled={!selectedOption}
      >
        Proceed with {optionsWithScores[0].name}
      </button>
    </div>
  );
}
