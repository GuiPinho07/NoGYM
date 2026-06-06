import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  unit?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, unit, className = '', id, ...props }) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={`input-group ${className}`}>
      <label htmlFor={inputId} className="input-label">{label}</label>
      <div className="input-wrapper">
        <input id={inputId} className={`input-field ${error ? 'input-error' : ''} ${unit ? 'has-unit' : ''}`} {...props} />
        {unit && <span className="input-unit">{unit}</span>}
      </div>
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};
