import React from 'react';
import './BottomNav.css';

export const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <div className="nav-item">
        <span className="nav-icon">📊</span>
        <span className="nav-label">History</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">🤖</span>
        <span className="nav-label">PH</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">🏋️</span>
        <span className="nav-label">Equipment</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">👤</span>
        <span className="nav-label">Profile</span>
      </div>
    </nav>
  );
};
