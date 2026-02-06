import React, { useState } from 'react';
import './components.css';

export default function ResumeBuilder({ sections = [], onUpdate, targetRole }) {
  const [activeSection, setActiveSection] = useState(0);
  const [editedSections, setEditedSections] = useState(sections);

  const handleSectionUpdate = (idx, content) => {
    const updated = [...editedSections];
    updated[idx] = { ...updated[idx], content };
    setEditedSections(updated);
    onUpdate?.(updated);
  };

  const getSectionIcon = (type) => {
    switch (type) {
      case 'summary': return '📝';
      case 'experience': return '💼';
      case 'education': return '🎓';
      case 'skills': return '⚡';
      default: return '📄';
    }
  };

  return (
    <div className="component-card resume-builder-card">
      <h3>📄 Resume Builder</h3>
      <div className="resume-target">Optimized for: <strong>{targetRole}</strong></div>

      <div className="resume-editor">
        <div className="section-tabs">
          {editedSections.map((section, idx) => (
            <button
              key={idx}
              className={`section-tab ${activeSection === idx ? 'active' : ''}`}
              onClick={() => setActiveSection(idx)}
            >
              {getSectionIcon(section.type)} {section.type}
            </button>
          ))}
        </div>

        <div className="section-content">
          {editedSections[activeSection] && (
            <>
              <div className="section-header">
                <h4>{editedSections[activeSection].type}</h4>
                <button className="ai-enhance-button">✨ AI Enhance</button>
              </div>

              {editedSections[activeSection].type === 'summary' && (
                <textarea
                  className="section-editor"
                  value={editedSections[activeSection].content}
                  onChange={(e) => handleSectionUpdate(activeSection, e.target.value)}
                  rows={6}
                  placeholder="Write a compelling professional summary..."
                />
              )}

              {editedSections[activeSection].type === 'experience' && (
                <div className="experience-list">
                  {Array.isArray(editedSections[activeSection].content) ? (
                    editedSections[activeSection].content.map((exp, i) => (
                      <div key={i} className="experience-item">
                        <input
                          type="text"
                          value={exp.title}
                          className="exp-input"
                          placeholder="Job Title"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          className="exp-input"
                          placeholder="Company"
                        />
                        <textarea
                          value={exp.description}
                          className="exp-description"
                          rows={3}
                          placeholder="Key achievements and responsibilities..."
                        />
                      </div>
                    ))
                  ) : (
                    <textarea
                      className="section-editor"
                      value={editedSections[activeSection].content}
                      onChange={(e) => handleSectionUpdate(activeSection, e.target.value)}
                      rows={8}
                      placeholder="Add your work experience..."
                    />
                  )}
                </div>
              )}

              {editedSections[activeSection].type === 'skills' && (
                <div className="skills-editor">
                  <div className="skills-grid">
                    {Array.isArray(editedSections[activeSection].content) ? (
                      editedSections[activeSection].content.map((skill, i) => (
                        <div key={i} className="skill-tag">
                          {skill}
                          <button className="remove-skill">×</button>
                        </div>
                      ))
                    ) : (
                      <input
                        type="text"
                        className="skill-input"
                        placeholder="Add skills (comma-separated)"
                      />
                    )}
                  </div>
                </div>
              )}

              {editedSections[activeSection].type === 'education' && (
                <textarea
                  className="section-editor"
                  value={editedSections[activeSection].content}
                  onChange={(e) => handleSectionUpdate(activeSection, e.target.value)}
                  rows={4}
                  placeholder="Add your education..."
                />
              )}
            </>
          )}
        </div>
      </div>

      <div className="resume-actions">
        <button className="secondary-button">Preview</button>
        <button className="secondary-button">Download PDF</button>
        <button className="primary-button">Save & Continue</button>
      </div>
    </div>
  );
}
