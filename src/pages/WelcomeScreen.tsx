import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingForm } from '../components/onboarding/OnboardingForm';
import './WelcomeScreen.css';

export const WelcomeScreen: React.FC = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [appState, setAppState] = useState<'loading' | 'ready'>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate initial loading sequence
    const timer = setTimeout(() => {
      setAppState('ready');
    }, 1800); // Show logo for 1.8 seconds before transition
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000); // Navigate to home after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isCompleted, navigate]);

  const handleComplete = () => {
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="welcome-screen success-screen animate-fade-in">
        <div className="success-content">
          <div className="success-icon animate-fade-in-up">✓</div>
          <h1 className="animate-fade-in-up delay-100">Profile Saved</h1>
          <p className="animate-fade-in-up delay-200">You're ready to start your journey with NoGYM.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`welcome-screen ${appState}`}>
      <header className="welcome-header">
        <div className="brand-wrapper">
          <h1 className="brand-title">
            No<span className="brand-accent">GYM</span>
          </h1>
        </div>
        <p className="welcome-subtitle">Let's personalize your experience.</p>
      </header>
      
      <div className="form-wrapper">
        <OnboardingForm onComplete={handleComplete} />
      </div>
    </div>
  );
};
