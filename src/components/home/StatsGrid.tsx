import React from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import './StatsGrid.css';

export const StatsGrid: React.FC = () => {
  const { profile, isLoading } = useUserProfile();

  return (
    <div className="stats-grid">
      <div className="stat-card frequency-card">
        <h3 className="stat-title">Training Frequency</h3>
        <div className="stat-content placeholder-graph">
          <div className="frequency-circles">
            <div className="circle completed"></div>
            <div className="circle"></div>
            <div className="circle completed"></div>
            <div className="circle"></div>
            <div className="circle completed"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="graph-labels">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
        </div>
      </div>
      
      <div className="stat-card metadata-card">
        <h3 className="stat-title">My Stats</h3>
        <div className="stat-content metadata-content">
          {isLoading ? (
            <p>Loading...</p>
          ) : profile ? (
            <>
              <div className="meta-item">
                <span className="meta-value">{profile.weight}</span>
                <span className="meta-unit">kg</span>
              </div>
              <div className="meta-divider"></div>
              <div className="meta-item">
                <span className="meta-value">{profile.height}</span>
                <span className="meta-unit">cm</span>
              </div>
            </>
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>
    </div>
  );
};
