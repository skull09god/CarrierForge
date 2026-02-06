import React, { useState } from 'react';
import './components.css';

export default function InfoGatheringForm({ fields = [], onSubmit, title = "Tell Me More" }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setErrors(prev => ({ ...prev, [fieldName]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="component-card form-card">
      <h3 className="form-title">{title}</h3>
      <p className="form-subtitle">Let me gather some information to help you better</p>
      
      <form onSubmit={handleSubmit} className="info-form">
        {fields.map((field, idx) => (
          <div key={idx} className="form-field">
            <label className="field-label">
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="field-input"
                rows={4}
                placeholder={field.placeholder}
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="field-input"
              >
                <option value="">Select...</option>
                {field.options?.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="field-input"
                placeholder={field.placeholder}
              />
            )}
            
            {errors[field.name] && (
              <span className="field-error">{errors[field.name]}</span>
            )}
          </div>
        ))}
        
        <button type="submit" className="primary-button">
          Continue
        </button>
      </form>
    </div>
  );
}
