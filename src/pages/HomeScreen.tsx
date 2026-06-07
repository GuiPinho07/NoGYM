import React from 'react';
import { StatsGrid } from '../components/home/StatsGrid';
import { BottomNav } from '../components/navigation/BottomNav';
import { useUserProfile } from '../hooks/useUserProfile';
import './HomeScreen.css';

export const HomeScreen: React.FC = () => {
  const { profile } = useUserProfile();
  const displayName = profile?.firstName || 'Champion';

  return (
    <div className="home-screen">
      <header className="home-header">
        <h1 className="home-brand">
          No<span className="brand-accent">GYM</span>
        </h1>
      </header>

      <div className="greeting-section">
        <h1 className="greeting-title">
          <span className="greeting-hi">Hi,</span>
          <span className="greeting-name">{displayName}!</span>
        </h1>
      </div>
      
      <div className="content-section">
        <StatsGrid />
      </div>

      <div className="action-section">
        <button className="start-btn animate-pulse">
          <span className="start-btn-text">START</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};
