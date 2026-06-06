import React from 'react';
import './TextArea.css';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', id, ...props }) => {
  const inputId = id || `textarea-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={`textarea-group ${className}`}>
      <label htmlFor={inputId} className="textarea-label">{label}</label>
      <textarea 
        id={inputId} 
        className={`textarea-field ${error ? 'textarea-error' : ''}`} 
        {...props} 
      />
      {error && <span className="textarea-error-msg">{error}</span>}
    </div>
  );
};
