import React, { useState } from 'react';
import './components.css';

export default function ResourceList({ category, resources = [], onSelect }) {
  const [filter, setFilter] = useState('all');

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return '📄';
      case 'video': return '🎥';
      case 'course': return '🎓';
      case 'tool': return '🔧';
      default: return '📌';
    }
  };

  const filteredResources = filter === 'all'
    ? resources
    : resources.filter(r => r.type === filter);

  const types = [...new Set(resources.map(r => r.type))];

  return (
    <div className="component-card resource-list-card">
      <h3>📚 Recommended Resources</h3>
      <div className="resource-category">{category}</div>

      <div className="resource-filters">
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({resources.length})
        </button>
        {types.map(type => (
          <button
            key={type}
            className={`filter-button ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type)}
          >
            {getTypeIcon(type)} {type}
          </button>
        ))}
      </div>

      <div className="resources-grid">
        {filteredResources.map((resource, idx) => (
          <div key={idx} className="resource-card">
            <div className="resource-header">
              <span className="resource-icon">{getTypeIcon(resource.type)}</span>
              <span className="resource-type">{resource.type}</span>
            </div>
            <h4 className="resource-title">{resource.title}</h4>
            <p className="resource-description">{resource.description}</p>
            <button
              className="resource-link"
              onClick={() => onSelect?.(resource)}
            >
              View Resource →
            </button>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="empty-state">
          No {filter} resources available
        </div>
      )}
    </div>
  );
}
